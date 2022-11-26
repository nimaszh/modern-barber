const express = require('express')
const Pool = require("pg").Pool
const cors = require("cors");
const path = require('path');
const MelipayamakApi = require('melipayamak');
const https = require('https');

const app = express();
app.use(express.json()); //req.body
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});




const pool = new Pool({
    user: "postgres",
    password: "nima702646",
    host: "localhost",
    port: 5432,
    database: "barber"
  });

function dateGenerator(day) {
    const now = new Date()
    now.setDate(now.getDate() + day)
    const nowString = now.toISOString()
    const result = nowString.substr(0,10)
    return result
}
function timeGenerator(date) {
    const timeList = ['09:00:00','10:00:00','11:00:00','12:00','13:00','14:00','16:00','17:00','18:00','19:00'];
    timeList.map(time =>{
        console.log(time)
        pool.query(
            'INSERT INTO masoodbarber(time, date) VALUES($1, $2)',
            [time,date],
        )
        })
        
}

const masoodAdmin = {number:09359616266, password: 4321};

app.post('/adminlogin' , (request,response) => {
     const {usernumber, userpassword} = request.body
     if(usernumber === masoodAdmin.number && userpassword === masoodAdmin.password){
         response.json('True')
     }  else{
         response.json('false')
     }
})


app.post('/sendsms', (request,response) => {
    const {name,number,id} = request.body

    pool.query('INSERT INTO users(name,number) VALUES($1,$2)' , [name,number])
        .then(res => {console.log('done')})
        .catch(e => {console.log('already exist')})
    
    
    let random = Math.round(Math.random() * 100000);
    pool.query('UPDATE masoodbarber SET authcode=$1 WHERE id=$2 RETURNING *' , [random,id])
        .then(res => {
            let text = String(res.rows[0].authcode)
            let text1 ='Borna Barber - CODE : ' + text
            const data = JSON.stringify({
                'from': '50004001409871',
                'to': String(number),
                'text': String(text1)
            });
            
            const options = {
                hostname: 'console.melipayamak.com',
                port: 443,
                path: '/api/send/simple/9d89f16515e74f518c9d6db2bf78e7ec',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                }
            };
            
            const req = https.request(options, res => {
                console.log('statusCode: ' + res.statusCode);
            
                res.on('data', d => {
                    process.stdout.write(d)
                });
            });
            
            req.on('error', error => {
                console.error(error);
            });
            req.write(data);
            req.end()
            response.json('done')
        })
        .catch(e => {response.json(e)})
})

app.post('/authentication' , (request,response) => {
    const {id,authcode,name,number, service} = request.body
    pool.query('SELECT * FROM masoodbarber WHERE id=$1' ,[id])
    .then(res => {
        {if(Number(authcode) === res.rows[0].authcode){
            pool.query('UPDATE masoodbarber SET username=$1, usernumber=$2, available=$3 ,service=$4 WHERE id=$5' , [name,number,false,service,id])
            .then(res => {response.json('done')})
            .catch(e => {response.json('error')})
        }else{
            response.json('wrong')
        }}
        
    })
    .catch(e =>  {response.json('bye')})
})

app.get('/masoodtable' , (request,response) => {
    pool.query('SELECT * FROM masoodbarber WHERE date=$1 OR date=$2 or date=$3 ORDER BY date,time ASC', [dateGenerator(1),dateGenerator(2),dateGenerator(3)])
        .then(res => {response.json(res.rows)})
        .catch(e => console.log(e.stack))
})

app.get('/adminmasoodtable' , (request,response) => {
    pool.query('SELECT * FROM masoodbarber WHERE date=$1 OR date=$2 or date=$3 ORDER BY date,time ASC', [dateGenerator(0),dateGenerator(1),dateGenerator(2)])
        .then(res => {response.json(res.rows)})
        .catch(e => console.log(e.stack))
})

app.put('/masoodreserve', (request,response) => {
    const {id,name,number,service} = request.body
    pool.query('UPDATE masoodbarber SET available=$1, username=$2, usernumber=$3,service=$4 WHERE id=$5 RETURNING *',[false,name,number,service,id])
        .then(response.json())
        .catch(e => console.error(e.stack))
})
app.post('/masoodreservenew', (request,response) => {
    const {name,number} = request.body
    pool.query('INSERT INTO users(usernumber) VALUES($1)' [number])
        .then(res => {response.json('done')})
        .catch(e => {response.json('already exist')})
})
app.listen(30,() => {
    console.log('app is running on port 30')
})
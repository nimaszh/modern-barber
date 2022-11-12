const express = require('express')
const Pool = require("pg").Pool
const cors = require("cors");
const path = require('path');

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



app.get('/masoodtable' , (request,response) => {
    pool.query('SELECT id,time,date,available FROM masoodbarber WHERE date=$1 OR date=$2 or date=$3 ORDER BY date,time ASC', [dateGenerator(1),dateGenerator(2),dateGenerator(3)])
        .then(res => {response.json(res.rows)})
        .catch(e => console.log(e.stack))
})

app.put('/masoodreserve', (request,response) => {
    const {id,name,number,service} = request.body
    pool.query('UPDATE masoodbarber SET available=$1, username=$2, usernumber=$3,service=$4 WHERE id=$5 RETURNING *',[false,name,number,service,id])
        .then(response.json('done'))
        .catch(e => console.error(e.stack))
})

app.listen(3000,() => {
    console.log('app is running on port 3000')
})
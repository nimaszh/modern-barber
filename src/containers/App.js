import './App.css'
import Nav from '../components/Nav/Nav.js'
import ReserveImg from './Reserve.png'
import Location from './location.png'
import {useState , useEffect} from 'react'
import ArrowImg from './arrow.png'
import CloseImg from './close.png'
import AuthImg from './auth.png'


function App() {
    const [route, setRoute] = useState('home');
    function dayOfWeek(dayFromNow) {
        const week = ['Sunday' ,
                  'Monday',
                  'Tuesday' ,
                  'Wednesday' ,
                  'Thursday' ,
                  'Friday' ,
                  'Saturday' ,
                    
             ]
        let day = new Date().getDay() + dayFromNow
        if(day > 6) {
            day = day - 7
       }
        
        
        const wantedDate = week[day]

        return wantedDate
    }

    function Middle() {
    



        function Home() {
            return(
                <>
                    <div className="about">
                        <p className="about-text">BORNA IS THE BEST BARBER SHOP THAT YOU CAN FIND IN ENTIRE WORLD, WITH LIMITED CLICKS, GET YOUR HAIR DONE AS SOON AS POSSIBLE.</p>
                    </div>
                    <div className='chair circleBase type1 dim pointer'> 
                         <img src={ReserveImg} alt='reserve' onClick={() => {setRoute('reserve-1')}}/>
                    </div>
                </>
            )
        };

        function Reserve(){
            const [barber,chooseBarber] = useState(null);
            const [selectedService, setSelectedService] = useState(null)
            const [reserveId,setReserveId] = useState(null);
            const [reserveDone,setreserveDone] = useState(false);



            function BarberSelect() {
                return(

                    <div >
                        <div className='barber-select-top'>
                            <img src={CloseImg} alt='close' className='pointer dim back-button' onClick={() => {setRoute(null)}}></img>
                        </div>
                        <h1>Chose barber</h1>
                        <div className='barber-select'>
                            <p className='barber ba dim pointer' onClick={() => {chooseBarber('masood')}}>Masood</p>
                            <p className='barber ba dim pointer' onClick={() => {chooseBarber('taha')}}>Taha</p>
                        </div>
                    </div>
                )
            }

            function ServiceSelect() {

                function Service({title, time}){
                    return(
                        <div className='barber dim ba pointer service ma1'  onClick={() => {setSelectedService(String(time))}}>
                            <p >{title}</p>
                            <p className='service-time bl' >{time}</p>
                        </div>
                    )}
                return(
                    <div>
                        <div className='barber-select-top'>
                        <img src={CloseImg} alt='close' className='pointer dim back-button' onClick={() => {chooseBarber(null)}}></img>
                        </div>
                        <h3>Choose Service</h3>
                        <div className='barber-select'>
                            <Service title={'Hair Cut'} time={'45 Min'}/>
                            <Service title={'Beard Shave'} time={'15 Min'}/>
                            <Service title={'Hair Cut & Beard Shave'} time={'60 Min'}/>
                        </div>
                    </div>
                )
            }

            function ReserveDates() {
                const [data,setData] = useState(null);
                useEffect(() => {
                    fetch('http://141.11.42.106:3005/masoodtable', {
                      method: 'get',
                      headers: {'Content-Type': 'application/json'},
                    }).then(res => res.json())
                      .then(data => {
                          setData(data)
                      })    
                }, []);
                
                
                function Dates({shift}){
                    if(shift.available){
                        return(
                            <>
                                <p className="white time bl br pointer dim light-green " onClick={() => {setReserveId(shift.id)}}>{shift.time}</p>
                            </>
                        )
                    }
                        return(
                            <>
                                <p className="white time bl br pointer dim red">x</p>
                            </>
                        )
                   
                }
                
                
                const rows = []
                if(data){
                    data.map((shift,index) => {
                        rows.push(<Dates key ={index} shift={shift}/>)
                    })
                }

                function EachDay({value}){
                    let i = value
                    i = i * 10
                    let x = i + 10
                    const eachday = []
                    while(i < x){
                        console.log(i)
                        eachday.push(rows[i]) // rows[i] = <Dates/>
                        i = i + 1
                    } 
                    return(
                        <div>
                            <h2>{dayOfWeek(value + 1)}</h2>
                            {eachday}
                        </div>
                    )
                }
                
                return( <div className='reserve-page'>
                            <div className='barber-select-top'>
                                <img src={CloseImg} alt='close' className='pointer dim back-button' onClick={() => {setSelectedService(null)}}></img>
                            </div>
                            <div className="reserve-dates">
                                <EachDay value={0}/>
                                <EachDay value={1}/>
                                <EachDay value={2}/>
                            </div>
                        </div>

                )

            }

            function Form(){
                const [userName,setUserName] = useState(null);
                const [userNumber,setUserNumber] = useState(null);
                const [authNumber,setAuthNumber] = useState(null)
                const [sendAuth, setSendAuth] = useState(false)
                const [falseAuth,setFalseAuth] = useState(false)
                const [falseAttempt,setFalseAttempt] = useState(false);
                function onNameChange(event){
                    setUserName(event.target.value)
                }
                
                function onNumberChange(event){
                    setUserNumber(event.target.value)
                }
                function onAuthChange(event){
                    setAuthNumber(event.target.value)
                }
                function Error(){
                    return(<><h1 className='red'>Please enter something!</h1></>)
                }
                
                function onSmsButtonSubmit() {
                    if(userName === null || userNumber === null){
                        setFalseAttempt(true)
                    } else {
                        fetch('http://141.11.42.106:3005/sendsms', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                              id: Number(reserveId),
                              name: userName,
                              number: Number(userNumber) ,
                            })
                          }).then(response => response.json())
                            .then(data => console.log(data))
                            .catch(err => console.log(err));
                        setSendAuth(true)
                    }

                }
                function onButtonSubmit(){
                                        if(userName === null || userNumber === null){
                        setFalseAttempt(true)
                    } else {
                        fetch('http://141.11.42.106:3005/authentication', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                              id: Number(reserveId),
                              name: userName,
                              number: Number(userNumber) ,
                              authcode : Number(authNumber),
                              service: String(selectedService)
                            })
                          }).then(response => response.json())
                            .then(data => {if(data==='done'){
                                setreserveDone(true)
                            }else{
                                setFalseAuth(true)
                            }})
                            .catch(err => console.log(err));
                        // setreserveDone(true)
                    }

                
                }

                let falseAlarm;
                if (falseAttempt === true){
                           falseAlarm = <Error/>
                }
                let authMessage;
                if(sendAuth){
                    authMessage = <p>.کد 5 رقمی برای شما ارسال شد</p>
                }
                let wrongAuth;
                if(falseAuth){
                    wrongAuth = <p> .کد وارد شده صحیح نمیباشد</p>
                }

                return(
                <div>
                    <div className='barber-select-top'>
                        <img src={CloseImg} alt='close' className='pointer dim back-button' onClick={() => {setReserveId(null)}}></img>
                    </div>
                    <div className='form'>
                        <div className='form-input'>
                            <p className=''>Name</p>
                            <input className='input' type="text" id="name" name="user_name" onChange={onNameChange}></input>
                        </div >
                        <div className='form-input'>
                            <p>Phone Number</p>
                            <input className='input' type="text" id="number" name="user_number" onChange={onNumberChange}></input>
                        </div>
                        <div className=' auth form-input'>
                            <img src={AuthImg} className='auth-img dim pointer' onClick={() => {onSmsButtonSubmit()}}></img>
                            <input className='auth-input' type="text" id="authcode" name="authentication" onChange={onAuthChange} ></input>
                        </div>
                        {wrongAuth}
                        {authMessage}
                        {falseAlarm}
                        <div className='form-input'>

                            <p className='form-button dim ba' onClick={() => {onButtonSubmit()}}> ✔</p>
                        </div>

                     </div>
                </div>
                
                )
            }

            function FinalMessage(){
                return(
                    <div>
                        <div className='barber-select-top'>
                            <img src={CloseImg} alt='close' className='pointer dim back-button' onClick={() => {setRoute('home')}}></img>
                        </div>
                        <h1>Done.</h1>
                        <p>Thanks for co'operating with us, we are waiting for you.Have a great day.</p>

                    </div>
                )
            }

            
            
            let content = <BarberSelect/>
            if(barber) {
                content = <ServiceSelect/>
            } 
            if (selectedService) {
                content = <ReserveDates/>
            }
            if(reserveId){
                content = <Form/>
            }
            if(reserveDone){
                content = <FinalMessage/>
            }
            
            return (
                <div className='reserve'>
                    {content}
                </div>
            )


        }

        function AdminPannel(){
            const [data,setData] = useState(null);
            useEffect(() => {
                fetch('http://141.11.42.106:3005/adminmasoodtable', {
                  method: 'get',
                  headers: {'Content-Type': 'application/json'},
                }).then(res => res.json())
                  .then(data => {
                      setData(data)
                  })    
            }, []);



            function AdminData({shift}){
                return(
                    <div className='admin-data'>
                        <h3 className='admin-data-type admin-data-recieved'>{shift.time}</h3>
                        <h3 className='admin-data-type admin-data-recieved'>{shift.usernumber}</h3>
                        <h3 className='admin-data-type admin-data-recieved'>{shift.username}</h3>
                        <h3 className='admin-data-type admin-data-recieved' > {shift.service}</h3>
                        <h3 className='admin-data-type chert admin-data-recieved'>{shift.available}</h3>
                     </div>

                )
            }
            const rows = []
            if(data){
                data.map((shift,index) => {
                    rows.push(<AdminData key ={index} shift={shift}/>)
                })
            }
            function EachDay({value}){
                let i = value
                i = i * 10
                let x = i + 10
                const eachday = []
                while(i < x){
                    console.log(i)
                    eachday.push(rows[i]) // rows[i] = <Dates/>
                    i = i + 1
                } 
                return(
                    <div>
                        <h2 className='admin-day underline white'>{dayOfWeek(value)}</h2>
                        {eachday}
                    </div>
                )
            }



            return(
                <div className='admin-pannel'>
                    <div>
                        <div className='admin-data'>
                            <h3 className='admin-data-type'>Time</h3>
                            <h3 className='admin-data-type'>User Number</h3>
                            <h3 className='admin-data-type'>User Name</h3>
                            <h3 className='admin-data-type'> Service</h3>
                            <h3 className='admin-data-type chert'>Reserve</h3>
                        </div>
                        <EachDay value={0}/>
                        <EachDay value={1}/>
                        <EachDay value={2}/>
                        
                    </div>
                </div>
            )
        }
        function AdminLogin(){
            const [password,setPassword] = useState('');
            const [userNumber,setUserNumber] = useState('');
            const [falseAttempt, setFalseAttempt] = useState(false)
            function onPasswordChange(event){
                setPassword(event.target.value)
            }
            
            function onNumberChange(event){
                setUserNumber(event.target.value)
            }
            function onButtonSubmit() {
                fetch('http://141.11.42.106:3005/adminlogin', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                      usernumber: Number(userNumber) ,
                      userpassword: Number(password),
                    })
                  }).then(response => response.json())
                    .then(data => {if(data === 'True') {
                        setRoute('adminpanel');
                    }else{
                        console.log(data)
                        setFalseAttempt(true)
                    }})
                    .catch(err => err.json('wrong'));

            }

            let falseAlarm;
            if (falseAttempt === true){
                       falseAlarm = <h3 className='white underline'>Wrong Information, try again.</h3>
            }
            return(
                <div>
                    <div className='form'>
                        <div className='form-input'>
                            <p className='white'>Phone Number</p>
                            <input className='input' type="text" id="name" name="user_name" onChange={onNumberChange}></input>
                        </div >
                        <div className='form-input'>
                            <p className="white">Password</p>
                            <input className='input' type="password" id="number" name="user_number" onChange={onPasswordChange}></input>
                            {falseAlarm}
                        </div>
                        <div className='form-input'>
                            <p className='form-button dim ba' onClick={() => {onButtonSubmit()}}> Enter</p>
                        </div>
                    </div>
                </div>
            )
        }

        let content;
        content = <Home/>
        if(route==='home'){
            content = <Home/>
        }
        if(route === 'reserve-1') {
            content = <Reserve/>
        }  
        if(route === 'admin') {
            content = <AdminLogin/>
        }
        if(route === 'adminpanel') {
            content = <AdminPannel/>
        }
        


        return(
            <div className="middle">
                {content}
            </div>
        )

    }

    function Footer(){
        const openInNewTab = url => {
            window.open(url, '_blank', 'noopener,noreferrer');
          };
        return(
            <footer className='footer'>
                <div className='footer-top'>
                    <div className='footer-top-box'>
                        <div>
                            <div className='phone-number'>
                                <img src={ArrowImg} className='arrow'></img>
                                <p>Masood : 09359616266</p>
                            </div>
                            <div className='phone-number '>
                                <img src={ArrowImg} className='arrow'></img>
                                <p>Tahaa   : 09104511968</p>
                            </div>
                            <div className='phone-number' >
                                <img src={ArrowImg} className='arrow'></img>
                                <p>Shop : 02144713242</p>
                            </div>

                        </div>
                    </div>
                    <div className='footer-top-box-2 pointer dim'>
                    <p onClick={() => {openInNewTab('https://www.google.com/maps/place/%DA%AF%D9%84%D9%81%D8%B1%D9%88%D8%B4%DB%8C+%D9%85%D9%84%DB%8C%DA%A9%D8%A7%E2%80%AD/@35.7473361,51.2633157,21z/data=!4m7!3m6!1s0x3f8dfbc8d8a7ecf5:0x21d072ae5410de90!4b1!8m2!3d35.7473574!4d51.2632507!16s%2Fg%2F11h3qt9pmv')}}>آدرس : میدان المپیک - خیابان ایرانیان - انتهای بن بست ایرانیان - پیرایش برنا</p>
                        <img src={Location}></img>
                    </div>
                </div>
                <div className='copyright'>

                   © 2022 RG Comnpany All rights reserved.
                </div>


            </footer>
        )
    }

    return (
        <div className='all'>
            <Nav setRoute={setRoute}/>
            <Middle/>
            <Footer/>
        </div>
    )
}

export default App;
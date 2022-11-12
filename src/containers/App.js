import './App.css'
import Nav from '../components/Nav/Nav.js'
import ReserveImg from './Reserve.png'
import {useState , useEffect} from 'react'

function App() {

    function Middle() {
    
        const [route, setRoute] = useState(null);


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



            function BarberSelect() {
                return(

                    <div >
                        <h1>.انتخاب کنید</h1>
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
                        <div className='barber dim ba pointer service ma1' >
                            <p >{title}</p>
                            <p className='service-time bl' onClick={() => {setSelectedService(String(time)); console.log(selectedService)}}>{time}</p>
                        </div>
                    )}
                return(
                    <div>
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
                    fetch('http://141.11.42.106:3000/masoodtable', {
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
                                <p className="white time bl br pointer dim" onClick={() => {setReserveId(shift.id)}}>{shift.time}</p>
                            </>
                        )
                    }
                }
                
                
                const rows = []
                if(data){
                    data.map((shift,index) => {
                        rows.push(<Dates key ={index} shift={shift}/>)
                    })
                }

                function EachDay({value}){
                    function dayOfWeek(dayFromNow) {
                        const week = ['یکشنبه' ,
                                  'دو شنبه',
                                  'سه شنبه' ,
                                  'چهارشنبه' ,
                                  'پنج شنبه' ,
                                  'جمعه' ,
                                  'شنبه' ,
                                    
                             ]
                        let day = new Date().getDay() + dayFromNow
                        if(day > 6) {
                            day = day - 7
                       }
                        
                        
                        const wantedDate = week[day]
                
                        return wantedDate
                    }


                    let i = value
                    i = i * 9
                    let x = i + 9
                    const eachday = []
                    while(i < x){
                        console.log(i)
                        eachday.push(rows[i]) // rows[i] = <Dates/>
                        i = i + 1
                    } 
                    return(
                        <div>
                            <p className="time">{dayOfWeek(value+1)}</p>
                            {eachday}
                        </div>
                    )
                }
                
                return(<div className="reserve-dates"> 
                            <EachDay value={0}/>
                            <EachDay value={1}/>
                            <EachDay value={2}/>
                       </div>
                )

            }

            function Form(){
                const [userName,setUserName] = useState('');
                const [userNumber,setUserNumber] = useState('');
                function onNameChange(event){
                    setUserName(event.target.value)
                }
                
                function onNumberChange(event){
                    setUserNumber(event.target.value)
                }
                function onButtonSubmit() {
                    fetch('http://localhost:3000/masoodreserve', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                          id: Number(reserveId),
                          name: userName,
                          number: Number(userNumber) ,
                          service: selectedService,
                        })
                      }).then(response => response.json())
                        .then(data => console.log(data))
                }
                return(
                <div className='form'>
                    <div className='form-input'>
                        <p className=''>Name</p>
                        <input className='input' type="text" id="name" name="user_name" onChange={onNameChange}></input>
                    </div >
                    <div className='form-input'>
                        <p>Phone Number</p>
                        <input className='input' type="text" id="number" name="user_number" onChange={onNumberChange}></input>
                    </div>
                    <div className='form-input'>
                        <p className='form-button dim ba' onClick={() => {onButtonSubmit()}}> ✔</p>
                    </div>

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
            
            return (
                <div className='reserve'>
                    {content}
                </div>
            )


        }
        let content;
        content = <Home/>
        if(route === 'reserve-1') {
            content = <Reserve/>
        }  
        



        return(
            <div className="middle">
                {content}
            </div>
        )

    }

    return (
        <div>
            <Nav/>
            <Middle/>
        </div>
    )
}

export default App;
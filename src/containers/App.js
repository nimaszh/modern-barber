import './App.css'
import Nav from '../components/Nav/Nav.js'
import ReserveImg from './Reserve.png'
import {useState , useEffect} from 'react'

function App() {

    function Middle() {
    
        const [route, serRoute] = useState(null);

        function Home() {
            return(
                <>
                    <div className="about">
                        <p className="about-text">BORNA IS THE BEST BARBER SHOP THAT YOU CAN FIND IN ENTIRE WORLD, WITH LIMITED CLICKS, GET YOUR HAIR DONE AS SOON AS POSSIBLE.</p>
                    </div>
                    <div className='chair circleBase type1 dim pointer'> 
                         <img src={ReserveImg} onClick={() => {serRoute('reserve')}}/>
                    </div>
                </>
            )
        }

        function Reserve(){
            return(
                <div>
                    <h1 className="white">Please choose the barber</h1>
                    <div>
                        <p className="white">Masood</p>
                        <p className="white">Taha</p>
                    </div>
                </div>
            )
        }
        let content;
        content = <Home/>
        if(route === 'reserve') {
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
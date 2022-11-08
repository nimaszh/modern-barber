import './App.css'
import Nav from '../components/Nav/Nav.js'
import ReserveImg from './Reserve.png'

function App() {

    function Middle() {

        return(
            <div className="middle">
                <div className="about">
                    <p className="about-text">BORNA IS THE BEST BARBER SHOP THAT YOU CAN FIND IN ENTIRE WORLD, WITH LIMITED CLICKS, GETS YOUR HAIR DONE AS SOON AS POSSIBLE.</p>
                </div>
                <div className='chair circleBase type1 dim pointer'> 
                     <img src={ReserveImg}/>
                </div>

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
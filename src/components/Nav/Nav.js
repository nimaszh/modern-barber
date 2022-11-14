import LogoImage from './Logo.png';
import ShopName from './ShopName.png'
function Nav({setRoute}){



    return(
        <nav className="bg-white nav">
                <img src={LogoImage} alt="Logo" className="logo" />
                <img src={ShopName} alt="Logo" className="ShopName dim" />
                <div className="admin dim pointer">
                     <h1 className='admin-text' onClick={() => {setRoute('admin')}}>A</h1>
                </div>


        </nav>
    )
}
export default Nav;
import LogoImage from './Logo.png';
import ShopName from './ShopName.png'
function Nav({setRoute}){



    return(
        <nav className="bg-white nav">
                <img src={LogoImage} alt="Logo" className="logo" />
                <img src={ShopName} alt="Logo" className="ShopName dim pointer" onClick={()=>{setRoute('home')}} />
                <div className="admin dim pointer">
                     <h1 className='admin-text ' onClick={() => {setRoute('admin')}}>Admin</h1>
                </div>


        </nav>
    )
}
export default Nav;
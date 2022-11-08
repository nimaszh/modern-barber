import LogoImage from './Logo.png';
import ShopName from './ShopName.png'
function Nav(){



    return(
        <nav className="bg-white nav">
            <img src={LogoImage} alt="Logo" className="logo" />
            <img src={ShopName} alt="Logo" className="ShopName dim" />
        </nav>
    )
}
export default Nav;
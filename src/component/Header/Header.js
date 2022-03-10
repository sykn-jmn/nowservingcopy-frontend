import './Header.css';
import { VscGlobe } from 'react-icons/vsc';

const Header = () => {
    return (
        <div className="header-container">
            <img src="https://static.nowserving.ph/logo/nowserving.png" className="logo"/>
            <div className='header-right'>
                <a className='primary-button'>SIGN UP / LOG IN</a>
                <div className='secondary-button'><VscGlobe size={20}/><strong>ENG</strong></div> 
            </div>
            
        </div>
    );
}
 
export default Header;
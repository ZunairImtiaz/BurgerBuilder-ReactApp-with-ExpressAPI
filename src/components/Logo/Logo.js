import burgerLogo from '../../assets/image/burger-logo.png';
import './Logo.css';

const Logo = () => (
    <div className='Logo'>
        <img src={burgerLogo} alt='My Burger' />
    </div>
);

export default Logo;
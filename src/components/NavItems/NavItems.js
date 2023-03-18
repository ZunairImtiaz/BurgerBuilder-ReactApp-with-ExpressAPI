import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './NavItems.css';

const NavItems = props => (
    <ul className='NavItems'>
        <li className='NavItem'><NavLink to="/">Burger Builder</NavLink></li>
        { props.isAuthenticated && 
            <li className='NavItem'><NavLink to="/orders">Orders</NavLink></li> }
        { props.isAuthenticated 
            ? <li className='NavItem'><NavLink to="/logout">Logout</NavLink></li> 
            : <li className='NavItem'><NavLink to="/auth">Authenticate</NavLink></li> }
    </ul>
);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token != null
});

export default connect(mapStateToProps)(NavItems);
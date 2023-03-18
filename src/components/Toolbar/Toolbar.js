import './Toolbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { showDrawer, hideDrawer } from '../../store/actions/burgerBuilderActions';
import Logo from '../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

function Toolbar() {
    const openDrawer = useSelector(state => state.burger.showDrawer);
    const dispatch = useDispatch();
    const drawerToggle = () => {
        if (openDrawer) {
            dispatch(hideDrawer());
        } else {
            dispatch(showDrawer());
        }
    }
    return (
        <header className='Toolbar'>
            <DrawerToggle toggle={drawerToggle}/>
            <div className='LogoPC'>
                <Logo />
            </div>
            <nav className='DesktopOnly'>
                <NavItems/>
            </nav>
        </header>
    );
};

export default Toolbar;
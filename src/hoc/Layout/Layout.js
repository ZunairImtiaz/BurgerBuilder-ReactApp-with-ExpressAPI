import './Layout.css';
import Aux from '../Auxlary/Auxlary';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

const Layout = props => {
    return (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className='Content'>
            {props.children}
        </main>
    </Aux>
    );
};

export default Layout;
import "./SideDrawer.css";
import Logo from "../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../hoc/Auxlary/Auxlary";
import { useDispatch, useSelector } from "react-redux";
import { hideDrawer } from "../../store/actions/burgerBuilderActions";

function SideDrawer() {
    const openDrawer = useSelector(state => state.burger.showDrawer);
    const dispatch = useDispatch();

    let classes = 'SideDrawer Close';
    if (openDrawer) {
        classes = 'SideDrawer Open';
    }
    return (
        <Aux>
            <Backdrop 
                show={openDrawer} 
                closeBackdrop={() => dispatch(hideDrawer())}/>
            <div className={classes} onClick={() => dispatch(hideDrawer())}>
                <Logo />
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;
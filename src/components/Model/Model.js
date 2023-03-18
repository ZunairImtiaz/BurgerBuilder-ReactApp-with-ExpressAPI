import { useDispatch, useSelector } from 'react-redux';
import './Model.css';
import Aux from '../../hoc/Auxlary/Auxlary';
import Backdrop from '../Backdrop/Backdrop';
import { hideBackdrop } from '../../store/actions/burgerBuilderActions';

function Model(props) {
    const enableBackdrop = useSelector(state => state.burger.showBackdrop);
    const dispatch = useDispatch();
    return (
        <Aux>
            <Backdrop 
                show={enableBackdrop} 
                closeBackdrop={() => dispatch(hideBackdrop())}/>
            <div 
                className='Model' 
                style={{ 
                    transform: enableBackdrop ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: enableBackdrop ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    );
};

export default Model;
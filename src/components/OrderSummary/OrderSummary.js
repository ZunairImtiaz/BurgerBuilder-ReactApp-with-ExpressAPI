import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hideBackdrop } from '../../store/actions/burgerBuilderActions';
import { purhaseInit } from '../../store/actions/ordersActions';
import './Button.css';
import Aux from '../../hoc/Auxlary/Auxlary';

function OrderSummary() {
    const navigate = useNavigate();
    const state = useSelector(state => state.burger);
    const dispatch = useDispatch();

    const ingredientSummary = Object.keys(state.ingredients).map(igKey =>(
        <li key={igKey}>
            <span style={{textTransform:'capitalize'}}>{igKey}</span>
            : {state.ingredients[igKey]}
        </li>
    ))
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {state.price}</strong></p>
            <p>Continue to Checkout?</p>
            <button 
                className='Button Danger' 
                onClick={() => dispatch(hideBackdrop())}>CANCEL</button>
            <button 
                className='Button Success'
                onClick={() => {
                    dispatch(purhaseInit());
                    navigate('/checkout');
                    dispatch(hideBackdrop());
                }}>CONTINUE</button>
        </Aux>
    );
};

export default OrderSummary;
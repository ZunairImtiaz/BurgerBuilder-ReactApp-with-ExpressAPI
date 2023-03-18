import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addIngreient, removeIngredient, showBackdrop } from '../../store/actions/burgerBuilderActions';
import { setAuthNavigatePath } from '../../store/actions/authActions';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

function BuildControls() {
    const navigate = useNavigate();

    const state = useSelector(state => state.burger);
    const isAuth = useSelector(state => state.auth.token !== null);
    const dispatch = useDispatch();

    const isPurchasable = ingredients => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, current) => sum + current, 0);
        return sum > 0;
    };

    const controls = [
        { label: 'Salad', ingName: 'salad' },
        { label: 'Bacon', ingName: 'bacon' },
        { label: 'Cheese', ingName: 'cheese' },
        { label: 'Meat', ingName: 'meat' }
    ];

    const disableInfo = { ...state.ingredients };
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }
    
    return (
        <div className='BuildControls'>
            <p>Current Price:<strong>{state.price}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    addIngredient={() => dispatch(addIngreient(ctrl.ingName))}
                    removeIngredient={() => dispatch(removeIngredient(ctrl.ingName))}
                    disabled={disableInfo[ctrl.ingName]} 
                />
            ))}
            <button 
                className='OrderButton' 
                disabled={ !isAuth? false : !isPurchasable(state.ingredients)}
                onClick={() => {
                    if (isAuth) {
                        dispatch(showBackdrop());
                    } else {
                        dispatch(setAuthNavigatePath('/checkout'));
                        navigate('/auth');
                    }
                }}>
                { isAuth ?  'Order Now' : 'SIGNUP FOR ORDER' }
            </button>
        </div>
    )
};

export default BuildControls;
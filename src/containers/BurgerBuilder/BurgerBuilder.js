import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Aux from '../../hoc/Auxlary/Auxlary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Model from '../../components/Model/Model';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { setIngredients } from '../../store/actions/burgerBuilderActions';

function BurgerBuilder(props) {
    const effectRan = useRef(true);
    const ing = { salad: 1, bacon: 1, cheese: 1, meat: 1 };

    useEffect(() => {
        if (effectRan.current) {
            props.onInitIngredients(ing);
            return () => {
                effectRan.current = false;
            };
        };
    }, [props]);

    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>

    let orderSummary = <Spinner/>;
    if (props.ingredients) {
        burger = (
            <Aux>
                <Burger/>
                <BuildControls/>
            </Aux>
        );
        orderSummary = <OrderSummary/>
    }

    return (
        <Aux>
            <Model>
                { orderSummary }
            </Model>
            { burger }
        </Aux>
    );
};
const mapStateToProps = state => ({ 
    ingredients: state.burger.ingredients, 
    error: state.burger.error 
});
const mapDispatchToProps = dispatch => ({ 
    onInitIngredients: ing => dispatch(setIngredients(ing)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
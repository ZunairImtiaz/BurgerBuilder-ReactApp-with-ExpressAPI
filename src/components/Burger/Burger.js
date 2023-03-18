import './Burger.css';
import { useSelector } from 'react-redux';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = () => {
    const ingredients = useSelector(state => state.burger.ingredients);
    const transformedIngredients = Object.keys(ingredients).map(igKey =>{
        return [ ...Array(ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    }).reduce((previous,current) => previous.concat(current), []);
    return (
        <div className='Burger'>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients.length === 0 ? 
                <p>Please, start adding Ingredents!</p>: transformedIngredients
            }
            <BurgerIngredient type='bread-bottom' />          
        </div>
    );
};

export default Burger;
import './Order.css';

function Order(props) {
    const ingredients = [];
    for (const igKey in props.ingredients) {
        delete props.ingredients._id;
        ingredients.push({name: igKey, amount: props.ingredients[igKey]});
    }
    const ingredientsOutput = ingredients.map(ig => (
        <strong className='Ingredient' key={ig.name}>
        {ig.name} ({ig.amount})
        </strong>
    ))

    return (
        <div className='Order'>
            <p className='Ingredient'>Ingredients: {ingredientsOutput}</p>
            <p>Price:  <strong>Rs: {props.price}</strong></p>
        </div>
    );
};

export default Order;
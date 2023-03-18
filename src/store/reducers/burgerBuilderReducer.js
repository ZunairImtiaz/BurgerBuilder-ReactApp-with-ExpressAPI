const initState = { 
    ingredients: null, 
    price: 210,
    showBackdrop: false,
    showDrawer: false,
    error: false,
    building: false
};

function burgerBuilderReducer(state = initState, action) {
    const ingredientPrices = { salad: 20, cheese: 40, meat: 100, bacon: 50 };
    switch (action.type) {
        case 'AAD_INGREDIENT':
            return {
                ...state,
                ingredients: { 
                    ...state.ingredients, 
                    [action.ingName]: state.ingredients[action.ingName] + 1 
                },
                price: state.price + ingredientPrices[action.ingName],
                building: true
            };
        case 'REMOVE_INGREDIENT':
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1
                },
                price: state.price - ingredientPrices[action.ingName],
                building: true
            };
        case 'SET_INGREDIENTS':
            return { 
                ...state, 
                ingredients: action.ingredients, 
                price: 210, 
                error: false, 
                building: false
            };
        case 'FETCH_INGREDIENTS_FAILED':
            return { ...state, error: true };
        case 'SHOW_BACKDROP':
            return { ...state, showBackdrop: true };
        case 'HIDE_BACKDROP':
            return { ...state, showBackdrop: false };
        case 'SHOW_DRAWER':
            return { ...state, showDrawer: true };
        case 'HIDE_DRWAER':
            return { ...state, showDrawer: false};
        default:
            return state;
    };
};

export default burgerBuilderReducer;
const initState = { orders: [], error: null, loading: false, purchased: false };

function orderReducer(state = initState, action) {
    switch (action.type) {
        case 'PURCHASE_INIT':
            return { ...state, purchased: false }
        case 'POST_ORDER_START':
            return { ...state, loading: true };
        case 'POST_ORDER_SUCCESS':
            return { 
                ...state, 
                orders: [{ ...action.order }],
                loading: false,
                purchased: true
            };
        case 'POST_ORDER_FAIL':
            return { ...state, loading: false };
        case 'FETCH_ORDERS_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_ORDERS_SUCCESS':
            return { ...state, loading: false, orders: action.orders, error: null };
        case 'FETCH_ORDERS_FAIL':
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    };
};

export default orderReducer;
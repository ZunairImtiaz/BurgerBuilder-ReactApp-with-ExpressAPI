const initState = { 
    token: null, 
    userId: null, 
    error: null, 
    loading: false, 
    authNavigatePath: '/' 
};

function authReducer(state = initState, action) {
    switch (action.type) {
        case 'AUTH_START':
            return { ...state, error: null, loading: true };
        case 'AUTH_SUCCESS':
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false
            };
        case 'AUTH_FAIL':
            return { ...state, error: action.error, loading: false };
        case 'LOGOUT':
            return { ...state, token: null, userId: null };
        case 'SET_AUTH_NAVIGATE_PATH':
            return { ...state, authNavigatePath: action.path };
        default:
            return state;
    };
};

export default authReducer;
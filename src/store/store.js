import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './reducers/burgerBuilderReducer';
import orderReducer from './reducers/ordersReducer';
import authReducer from './reducers/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ 
    burger: burgerBuilderReducer, 
    order: orderReducer,
    auth: authReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
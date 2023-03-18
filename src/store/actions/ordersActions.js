import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const postOrderSuccess = order => ({ type: 'POST_ORDER_SUCCESS', order });
const postOrderFail = () => ({ type: 'POST_ORDER_FAIL '});
const postOrderStart = () => ({ type: 'POST_ORDER_START' });
export const purhaseInit = () => ({ type: 'PURCHASE_INIT' });

export function orderBurger(order, navigate) {
    return async dispatch => {
        dispatch(postOrderStart());
        try {
            const res = await axios.post(`${BASE_URL}/orders/create`, order, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(postOrderSuccess(res.data));
            navigate('/');
        } catch (error) {
            dispatch(postOrderFail());
        }
    };
};

const fetchOrdersSuccess = orders => ({ type: 'FETCH_ORDERS_SUCCESS', orders });
const fetchOrdersFail = error => ({ type: 'FETCH_ORDERS_FAIL', error });
const fetchOrdersStart = () => ({ type: 'FETCH_ORDERS_START' });

export function fetchOrders() {
    return async dispatch => {
        dispatch(fetchOrdersStart());
        try {
            const res = await axios.get(`${BASE_URL}/orders`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(fetchOrdersSuccess(res.data));
        } catch (error) {
            dispatch(fetchOrdersFail(error.message));
        };
    };
};
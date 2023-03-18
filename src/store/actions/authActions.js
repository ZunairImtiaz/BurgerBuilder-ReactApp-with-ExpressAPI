import axios from "axios";

const authStart = () => ({ type: 'AUTH_START'});
const authSuccess = (token, userId) => ({ type: 'AUTH_SUCCESS', token, userId });
const authFail = error => ({ type: 'AUTH_FAIL', error });
const logout = () => {
    localStorage.removeItem('token');
    return { type: 'LOGOUT' };
};

const BASE_URL = process.env.REACT_APP_API_URL;

export function logoutReq() {
    return async dispatch => {
        try {
            await axios.patch(`${BASE_URL}/auth/logout`, null, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(logout());
        } catch (error) {
            dispatch(logout());            
        };
    };
};

export function auth(email, password, isSignin) {
    return async dispatch => {
        dispatch(authStart());
        let url = `${BASE_URL}/auth/signup`;
        if (isSignin)
            url = `${BASE_URL}/auth/signin`;
        const authData = { email, password };
        try {
            const res = await axios.post(url, authData);
            localStorage.setItem('token', res.data.token);
            dispatch(authSuccess(res.data.token, res.data.userid));
        } catch (error) {
            let err;
            if (error.response.data?.keyPattern && !isSignin) {
                err = 'this email already exist';
            } else if (error.response.data.message && !isSignin) {
                err = 'password length must between 6 and 15';
            } else if (error.response.data.message && isSignin) {
                err = error.response.data.message;
            } else {
                err = 'Invalid request';
            };
            dispatch(authFail(err));
        };
    };
};

export function authCheckState() {
    return async dispatch => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`${BASE_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            dispatch(authSuccess(token, res.data.userid));
        } catch (error) {
            dispatch(logoutReq());
        };
    };
};

export const setAuthNavigatePath = path => ({ type: 'SET_AUTH_NAVIGATE_PATH', path });
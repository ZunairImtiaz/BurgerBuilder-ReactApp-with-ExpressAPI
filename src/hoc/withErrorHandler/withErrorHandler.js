import { useState, useEffect } from "react";
import Model from "../../components/Model/Model";
import Aux from "../Auxlary/Auxlary";

const withErrorHandler = (WrappedComponent, axios) => (
    props => {
        const [ error, setError ] = useState(null);

        useEffect(() => {
            const reqInterceptor = axios.interceptors.request.use(req => {
                setError(null);
                return req;
            }); 
            const resInterceptor = axios.interceptors.response.use(res => res, error => {
                return setError(error)
            });

            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        });

        const errorConfirmedHandler = () => setError(null);

        return (
            <Aux>
                <Model show={error} closeModel={errorConfirmedHandler}>
                    {error && error.message}
                </Model>
                <WrappedComponent {...props}/>
            </Aux>
        );
    }
);

export default withErrorHandler;
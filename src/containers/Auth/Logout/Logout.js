import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutReq } from "../../../store/actions/authActions";

const Logout = props => {
    const effectRan = useRef(true);

    useEffect(() => {
        if (effectRan.current) {
            props.onLogout();
            return () => {
                effectRan.current = false;
            };
        };
    },[props]);

    return <Navigate to='/'/>;
};

const mapDispatchToProps = dispatch => ({
    onLogout : () => dispatch(logoutReq())
});

export default connect(null, mapDispatchToProps)(Logout);
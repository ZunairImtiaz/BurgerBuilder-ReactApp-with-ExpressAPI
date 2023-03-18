import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = WrappedComponent => {
    function ComponentWithRouter(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <WrappedComponent {...props} router={{ location, navigate, params}}/>
    }
    return ComponentWithRouter;
};

export default withRouter;
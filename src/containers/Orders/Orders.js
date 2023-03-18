import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Order from '../../components/Order/Order';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/ordersActions';

function Orders(props) {
    const effectRan = useRef(true);

    useEffect(() => {
        if (effectRan.current) {
            props.onFetchOrders();
            return () => {
                effectRan.current = false;
            };
        };
    },[props]);

    

    let ordersOutput = <Spinner/>;

    if (!props.loading) {
        ordersOutput = props.orders.map(order => (
            <Order 
                key={order._id} 
                ingredients={order.ingredients} 
                price={order.price} />
        ));
    };

    
    return (
        <div>
        <p style={{ textAlign: 'center', fontWeight: 'bold'}}>
            Total Orders: {props.orders.length}
        </p>
        { props.error ? props.error : ordersOutput}
        </div>
    );
};

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
});
const mapDispatchToProps = dispatch => ({
    onFetchOrders: () => dispatch(fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders,axios));
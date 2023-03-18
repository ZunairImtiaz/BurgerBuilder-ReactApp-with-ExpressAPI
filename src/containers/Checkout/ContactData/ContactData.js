import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './ContactData.css';
import Spinner from '../../../components/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { orderBurger } from '../../../store/actions/ordersActions';

function ContactData(props) {
    const [ name, setName ] = useState({value: '', isValid: false});
    const [ email, setEmail ] = useState({value: '', isValid: false});
    const [ street, setStreet ] = useState({value: '', isValid: false});
    const [ postal, setPostal ] = useState({value: '', isValid: false});
    const [ deliveryMethod, setDeliveryMethod ] = useState('cheapest');

    const navigate = useNavigate();

    const formValidity = () => {
        const validityList = [name.isValid,email.isValid,street.isValid,postal.isValid];
        const isvalid = validityList.every(value => value === true);
        return isvalid;
    }

    function orderHandler(e) {
        e.preventDefault();
        const orderData = { 
            ingredients: props.ingredients,
            price: props.price,
            orderData: { 
                name: name.value, 
                email: email.value, 
                street: street.value, 
                postal: postal.value, 
                deliveryMethod
            }
        }
        if (formValidity()) {
            props.onOrderBurger(orderData, navigate);
        }
    }   

    let form = (
        <form className='Form' onSubmit={orderHandler}>
            <input 
                className={ name.isValid ? 'Input' : 'Input IsValid' }
                type='text' 
                name='name' 
                placeholder='Your Name' 
                value={name.value}
                onChange={e => {
                    const value = e.target.value.trim();
                    setName({ value, isValid: value.length >= 3});
                }}/>
            <input 
                className={ email.isValid ? 'Input' : 'Input IsValid' }
                type='email' 
                name='email' 
                placeholder='Your Mail' 
                value={email.value}
                onChange={e => {
                    const value = e.target.value.trim();
                    const pattren = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                    setEmail({ value, isValid: pattren.test(value) });
                }}/>
            <input 
                className={ street.isValid ? 'Input' : 'Input IsValid' }
                type='text' 
                name='street' 
                placeholder='Street' 
                value={street.value}
                onChange={e => {
                    const value = e.target.value.trim();
                    setStreet({ value, isValid: value !== ''});
                }}/>
            <input 
                className={ postal.isValid ? 'Input' : 'Input IsValid' }
                type='text' 
                name='postal' 
                placeholder='Postal Code' 
                value={postal.value}
                onChange={e => {
                    const value = e.target.value.trim();
                    const pattren = /^\d+$/;
                    setPostal({ value, isValid: pattren.test(value) && value.length === 5 });
                }}/> 

            <select 
                className='Input' 
                value={deliveryMethod} 
                onChange={e => setDeliveryMethod(e.target.value)}
                >
                <option value='cheapest'>Cheapest</option>
                <option value='fastest'>Fastest</option>  
            </select>

            <button 
                className='Button Success' 
                disabled={!formValidity()} 
                onClick={orderHandler}>ORDER</button>
        </form>
    )
    if (props.loading) {
        form = <Spinner/>
    }

    return (
        <div className='ContactData'>
            <h4>Enter your Contact data</h4>
            {form}
        </div>
    );
};
const mapStateToProps = state => ({ 
    ingredients: state.burger.ingredients, 
    price: state.burger.price,
    loading: state.order.loading,
    status: state.order.status,
});
const mapDispatchToProps = dispatch => ({
    onOrderBurger: (order, navigate) => dispatch(orderBurger(order, navigate))
})
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
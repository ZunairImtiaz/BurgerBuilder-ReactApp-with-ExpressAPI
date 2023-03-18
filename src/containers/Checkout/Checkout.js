import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './Checkout.css';
import Burger from '../../components/Burger/Burger';
import ContactData from './ContactData/ContactData';
import Aux from '../../hoc/Auxlary/Auxlary';

function Checkout(props) {
    let summary = <Navigate to='/' />;
    if (props.ingredients) {
        summary = (
            <Aux>
                { props.purchase ? <Navigate to='/' /> : null }
                <div className='Checkout'>
                    <h2>We hope it taste well</h2>
                    <div style={{width: '100%', margin:'auto'}}>
                        <Burger />
                    </div>
            
                </div>
                <ContactData />
            </Aux>
        );
    };
    return summary;
};
const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    purchased: state.order.purchased
});
export default connect(mapStateToProps)(Checkout);
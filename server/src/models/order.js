const { Schema, model }  = require('mongoose');

const orderSchema = new Schema({
    ingredients: {
        type: { salad: Number, bacon: Number, cheese: Number, meat: Number },
        required: true
    },
    price: { type: Number, required: true },
    orderData: {
        type: {
            name: { type: String, required: true, trim: true },
            email: { 
                type: String, 
                required: true, 
                trim: true,
                lowercase: true,
                validate(value) {
                    const pattren = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    if (!pattren.test(value)) {
                        throw new Error('Invalid email')
                    }
                }
            },
            street: { type: String, required: true, trim: true },
            postal: { 
                type: Number, 
                required: true, 
                trim: true,
                validate(value) {
                    if (value.toString().length !== 5) {
                        throw new Error('postal code must consist on 5 digits')
                    }
                }
            },
            deliveryMethod: { type: String, required: true }
        }
    },
    customer: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });

const Order = model('Order', orderSchema);

module.exports = Order;
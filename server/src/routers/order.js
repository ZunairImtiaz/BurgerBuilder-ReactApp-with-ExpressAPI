const router = new require('express').Router();
const Order = require('../models/order');
const auth = require('../middleware/auth');

router.post('/create', auth, async (req,res) => {
    const order = new Order({ ...req.body, customer: req.user._id });
    try {
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    };
});

router.get('/', auth, async (req, res) => {
    try {
        await req.user.populate('orders');
        res.send(req.user.orders);
    } catch (error) {
        res.status(404).send(error);
    };
});

module.exports = router;
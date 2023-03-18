const router = new require('express').Router();
const User = require('../models/auth');
const auth = require('../middleware/auth');

router.post('/signup', async (req,res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({userid : user._id, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/signin', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ userid: user._id,token });
    } catch (error) {
        res.status(400).send({ error, message: 'incorrect email or invalid password!'});
    }
});

router.get('/me', auth, async (req,res) => res.status(200).send({ userid: req.user._id }));

router.patch('/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token !== req.token);
        await req.user.save();
        res.send('logout successfully');
    } catch (error) {
        res.send(error);
    }
});

router.patch('/logoutall', auth, async (req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send('logout successfully from all devices');
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;
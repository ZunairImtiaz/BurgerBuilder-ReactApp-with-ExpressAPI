const { Schema, model }  = require('mongoose');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const userSchema = new Schema({
    email: { 
        type: String, 
        unique: true,
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
    password: { 
        type: String, 
        required: true, 
        minlength: 6,
        trim: true
    },
    tokens: [{ type: String, required: true }]
});

userSchema.virtual('orders', { ref: 'Order', localField: '_id', foreignField: 'customer' });


// middleware methods------------->

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password
    delete userObject.tokens
    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const token = sign(
        { id: this.id.toString() }, 
        process.env.SECRET, 
        { expiresIn: '7 days' }
    );
    this.tokens = this.tokens.concat(token);
    await this.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error();
    };
    const isMatch = await compare(password, user.password);
    if (user && !isMatch) {
        throw new Error();
    };
    return user;
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 8);
    }
    next();
});

const User = model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Please enter a password'],
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
}, { timestamps: true })

UserSchema.pre('save', async function(req, res, next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE 
    })
}

UserSchema.methods.matchPassword = async function(enteredPassword) {
    const pass = await bcrypt.compare(enteredPassword, this.password)
    return pass
}

const User = mongoose.model('user', UserSchema);

module.exports = User;
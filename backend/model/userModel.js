const mongoose = require('mongoose');
const Counter = require('./counterModel');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    firstName: {
        type: String,
        trim: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 50
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    phoneNumber: {
        type: String,
        match: [/^\+?[\d\s\-\(\)]+$/, 'Please provide a valid phone number']
    },
    profileImage: {
        type: String,
        default: null
    },
    address: {
        street: {
            type: String,
            trim: true
        },
        district: {
            type: String,
            trim: true
        },
        province: {
            type: String,
            trim: true
        },
        zipCode: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

userSchema.virtual('id').get(function () {
    return this._id;
});

userSchema.pre('save', async function () {
    if (this.isNew && !this._id) {
        const counter = await Counter.findByIdAndUpdate(
            'user',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const number = String(counter.seq).padStart(2, '0');
        this._id = `user_${number}`;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
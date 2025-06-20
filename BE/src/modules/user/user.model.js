import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { randomStringGenerator } = require('../../utils/');
const statusType = require('../../config/constants.config')

// Define User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false, // don't return in queries
    },
    avatar: {
        type: String,
        default: '', // URL to Cloudinary or default image
    },
    bio: {
        type: String,
        maxlength: 150,
        default: '',
    },
    activationToken: {
        type: String,
        default: null
    },
    activatedFor: {
        type: Date,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.pre('save', function(next) {
    if (this.isNew && this.status === statusType.PENDING && !this.activationToken) {
        this.activationToken = randomStringGenerator(20);
        this.activatedFor = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
    next();
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;

require('dotenv').config(); 

const nodemailer = require('nodemailer');
const User = require('../model/userModel');
const OTP = require('../model/otpModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = '1d';

// ------------------- Nodemailer Setup -------------------
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


// ------------------- REQUEST OTP -------------------
exports.requestOtp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use at FootStyle' });
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        const otpData = {
            email: email.toLowerCase(),
            otp: otpCode,
            tempPassword: password,
            firstName,
            lastName,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        };

        await OTP.findOneAndUpdate(
            { email: email.toLowerCase() },
            otpData,
            { upsert: true, new: true }
        );

        await transporter.sendMail({
            from: `FootStyle Support <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your FootStyle Signup OTP',
            html: `
                <p>Hello ${firstName},</p>
                <p>Your OTP is: <b>${otpCode}</b></p>
                <p>This OTP expires in 5 minutes.</p>
            `,
        });

        res.status(200).json({
            message: 'OTP sent to your email - FootStyle',
            email: email.toLowerCase(),
        });
    } catch (error) {
        console.error('Request OTP Error:', error);
        res.status(500).json({ message: 'Server error - FootStyle' });
    }
};


// ------------------- VERIFY OTP & SIGNUP -------------------
exports.verifyOtpAndSignup = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        const otpRecord = await OTP.findOne({ email: email.toLowerCase() });
        if (!otpRecord) {
            return res.status(400).json({ message: 'OTP not found. Please request again.' });
        }

        if (otpRecord.expiresAt < new Date()) {
            await OTP.deleteOne({ email: email.toLowerCase() });
            return res.status(400).json({ message: 'OTP expired.' });
        }

        if (otpRecord.otp !== otp.toString()) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        const hashedPassword = await bcrypt.hash(otpRecord.tempPassword, 10);

        const newUser = new User({
            firstName: otpRecord.firstName,
            lastName: otpRecord.lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await newUser.save();
        await OTP.deleteOne({ email: email.toLowerCase() });

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(201).json({
            message: 'Signup successful! Welcome to FootStyle.',
            token,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({ message: 'Server error - FootStyle' });
    }
};
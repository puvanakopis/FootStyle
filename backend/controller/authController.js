require('dotenv').config();

const nodemailer = require('nodemailer');
const User = require('../model/userModel');
const OTP = require('../model/otpModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

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


// ------------------- Load Template -------------------
const loadTemplate = (fileName, replacements) => {
    let html = fs.readFileSync(
        path.join(__dirname, '../templates', fileName),
        'utf8'
    );

    Object.keys(replacements).forEach(key => {
        html = html.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    });

    return html;
};


// ------------------- REQUEST OTP -------------------
exports.requestOtp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validate input
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

        // Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash password immediately for security
        const hashedTempPassword = await bcrypt.hash(password, 10);

        const otpData = {
            email: email.toLowerCase(),
            otp: otpCode,
            tempPassword: hashedTempPassword,
            firstName,
            lastName,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        };

        // Upsert OTP record
        await OTP.findOneAndUpdate(
            { email: email.toLowerCase() },
            otpData,
            { upsert: true, new: true }
        );

        const html = loadTemplate('signupOtp.html', {
            firstName: firstName,
            otpCode: otpCode
        });

        await transporter.sendMail({
            from: `FootStyle Support <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your FootStyle Signup OTP',
            html
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

        if (!otp) {
            return res.status(400).json({ message: 'OTP are required' });
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

        // Create user with the already hashed password
        const newUser = new User({
            firstName: otpRecord.firstName,
            lastName: otpRecord.lastName,
            email: otpRecord.email.toLowerCase(),
            password: otpRecord.tempPassword,
        });

        await newUser.save();
        await OTP.deleteOne({ email: email.toLowerCase() });

        // Generate JWT
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


// ------------------- LOGIN -------------------
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!user || !isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'Your account is inactive. Contact admin.' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: 'Login successful - FootStyle',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error - FootStyle' });
    }
};


// ------------------- REQUEST PASSWORD RESET OTP -------------------
exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User with this email not found' });
        }

        // Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        const otpData = {
            email: email.toLowerCase(),
            otp: otpCode,
            tempPassword: null,
            firstName: user.firstName,
            lastName: user.lastName,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        };

        await OTP.findOneAndUpdate(
            { email: email.toLowerCase() },
            otpData,
            { upsert: true, new: true }
        );

        const html = loadTemplate('passwordResetOtp.html', {
            firstName: user.firstName,
            otpCode: otpCode
        });

        await transporter.sendMail({
            from: `FootStyle Support <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your FootStyle Password Reset OTP',
            html
        });


        res.status(200).json({ message: 'OTP sent to your email', email: email.toLowerCase() });
    } catch (error) {
        console.error('Request Password Reset Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// ------------------- VERIFY OTP FOR PASSWORD RESET -------------------
exports.verifyPasswordResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!otp) {
            return res.status(400).json({ message: 'OTP are required' });
        }

        const otpRecord = await OTP.findOne({ email: email.toLowerCase() });
        if (!otpRecord) {
            return res.status(400).json({ message: 'OTP not found. Please request again.' });
        }

        if (otpRecord.expiresAt < new Date()) {
            await OTP.deleteOne({ email: email.toLowerCase() });
            return res.status(400).json({ message: 'OTP expired. Please request again.' });
        }

        if (otpRecord.otp !== otp.toString()) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        res.status(200).json({ message: 'OTP verified. You can now reset your password.' });
    } catch (error) {
        console.error('Verify Password Reset OTP Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// ------------------- RESET PASSWORD -------------------
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: 'Email, OTP, and new password are required' });
        }

        const otpRecord = await OTP.findOne({ email: email.toLowerCase() });
        if (!otpRecord) {
            return res.status(400).json({ message: 'OTP not found. Please request again.' });
        }

        if (otpRecord.expiresAt < new Date()) {
            await OTP.deleteOne({ email: email.toLowerCase() });
            return res.status(400).json({ message: 'OTP expired. Please request again.' });
        }

        if (otpRecord.otp !== otp.toString()) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findOneAndUpdate(
            { email: email.toLowerCase() },
            { password: hashedPassword }
        );

        await OTP.deleteOne({ email: email.toLowerCase() });

        res.status(200).json({ message: 'Password reset successful. You can now login with new password.' });
    } catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// ------------------- GET CURRENT USER -------------------
exports.getCurrentUser = async (req, res) => {
    try {
        // req.user is assumed to be populated from JWT middleware
        const userId = req.user.id;

        const user = await User.findById(userId).select('-password'); // exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Current user fetched successfully',
            user
        });
    } catch (error) {
        console.error('Get Current User Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// ------------------- UPDATE CURRENT USER -------------------
exports.updateCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            firstName,
            lastName,
            phoneNumber,
            profileImage,
            address 
        } = req.body;

        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;
        if (profileImage) updateData.profileImage = profileImage;
        
        if (address !== undefined) {
            if (Object.keys(address).length === 0) {
                updateData.address = {};
            } else {
                updateData.address = { ...address };
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true, context: 'query' }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Update Current User Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
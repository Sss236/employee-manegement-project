const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Registration = require('../models/registration');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.signin = async function (req, res, next) {
  try {
    // finding a user
    const user = await User.findOne({
      username: req.body.username
    });
    const { id, role } = user;

    // checking if their password matches what was sent to the server
    const isMatch = await user.comparePassword(req.body.password);

    // if it all matches, log them in
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          role
        },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        id,
        role,
        token
      });
    } else {
      return next({
        status: 400,
        message: 'Invalid Username / Password.'
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid Username / Password.'
    });
  }
};

exports.generateRegistrationLink = async function (req, res, next) {
    try {
        // hr enter email and name in the frontend in req.body
        const { email, name } = req.body;
        const registration = await Registration.create(req.body);

        // Generate a registration token
        const registerToken = crypto.randomBytes(20).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(registerToken).digest('hex');

        // Set the reset token and its expiration on the registration model
        registration.registrationToken = hashedToken;
        // Set token to expire in 3 hour
        registration.registrationExpires = Date.now() + 3600000 * 3; 

        // Construct registration URL
        const registerUrl = `http://localhost:3000/registration/${resetToken}`;
        registration.registrationLink = registerUrl;
        
        await registration.save();
        // Email setup
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Our Team - Complete Your Registration',
            text: `Hi ${name}, welcome to the team! Please complete your registration by clicking on the following link: ${registerUrl}. 
            This link will expire in 3 hours. If you have any questions, please don't hesitate to reach out.`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error('Send Mail Error:', error);
                return next({
                    status: 500,
                    message: 'Error sending registration email.'
                });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: 'Registration link sent.' });
            }
        });
    } catch (err) {
        console.error('Generate registration link Error:', err);
        return next({
            status: 500,
            message: 'Error processing generating registration link request.'
        });
    }
};

exports.requestRegistration = async function(req, res, next) {
    const { token, email, username, password } = req.body;
    const user = await User.create(req.body);
    await user.save();
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    try {
        const registration = await Registration.findOne({
            registrationToken: hashedToken,
            registrationExpires: { $gt: Date.now() }
        });

        if (!registration) {
            return res.status(400).json({ message: 'Token is invalid or has expired' });
        }

        registration.status = 'Submitted';
        registration.userId = user._id;
        await registration.save();

        res.status(200).json({ message: 'Registration completed' });
    } catch (error) {
        next(error);
    }
};


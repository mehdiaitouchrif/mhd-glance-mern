const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

// @desc    Register user
// @route   /api/auth/register
// @access   Public
exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body)
        sendTokenResponse(user, 201, res)
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: errorHandler(error)
        })
    }
}

// @desc    Login user
// @route   /api/auth/login
// @access   Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please enter a valid email and password'
            })
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid Credentials'
            })
        }

        const isCorrectPassword = await user.matchPassword(password);
        console.log(isCorrectPassword)
        if (!isCorrectPassword) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }
        sendTokenResponse(user, 201, res)

    } catch (error) {
        res.status(400).json({
            success: false,
            errors: errorHandler(error)
        })
    }
}

// @desc    Get current user
// @route   /api/auth/currentUser
// @access   Private
exports.getCurrent = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            // errors: errorHandler(error)
        })
    }
}

// @desc    Log user out
// @route   /api/auth/logout
// @access   Private
exports.logout = async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 1),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        data: {}
    })

}

const sendTokenResponse = function (user, statusCode, res) {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        // httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}

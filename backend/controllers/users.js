const User = require('../models/User');

// @desc     Get all users
// @route    GET /api/users
// @access   Private/Admin
exports.getUsers = async (req, res,) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    })
};

// @desc     Get single user
// @route    GET /api/users/:id
// @access   Private/Admin
exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
};

// @desc    Ban/Delete user
// @route    DELETE /api/users
// @access   Private/Admin
exports.deleteUser = async (req, res) => {
    let user = await User.findById(req.params.id);
    if (user) {
        await User.findByIdAndRemove(req.params.id);

        res.json({
            success: true,
            msg: 'User removed'
        });

    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }
};


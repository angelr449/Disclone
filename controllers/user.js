const { response } = require("express");

const { User } = require("../models");


// GET /users/me
const getUserByToken = async (req, res = response) => {

    const { user } = req;

    if (!user) {
        return res.status(401).json({
            msg: 'Unauthorized'
        });
    }

    try {

        const dbUser = await User.findByPk(user.id, {
            attributes: {
                exclude: ['password']
            }
        });

        if (!dbUser) {
            return res.status(404).json({
                msg: 'User not found'
            });
        }

        res.status(200).json({
            user: dbUser
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: 'Please try again later.'
        });
    }
};


// GET /users/:id
const getUserById = async (req, res = response) => {

    const { id } = req.params;

    try {

        const dbUser = await User.findByPk(id, {
            attributes: {
                exclude: ['password']
            }
        });

        if (!dbUser) {
            return res.status(404).json({
                msg: 'User not found'
            });
        }

        res.status(200).json({
            user: dbUser
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: 'Please try again later.'
        });
    }
};


module.exports = {
    getUserByToken,
    getUserById
};
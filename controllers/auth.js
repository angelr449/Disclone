const { response } = require("express");
const bcrypt = require('bcryptjs')
const { User } = require("../models");
const { generateJWT } = require("../helpers/generate-jwt");




const signin = async (req, res = response) => {

    const { name, email, password, repeatPassword } = req.body;

    try {


        // Check password
        if (password != repeatPassword) {
            return res.status(401).json({ msg: 'Passwords do not match' });

        }

        // Check if email is alredy in use
        const user = await User.findOne({
            where: { email },
            paranoid: false
        });

        if (user) {
            return res.status(409).json({ msg: 'Email already in use' });
        }

        // encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);



        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        // generate a JWT

        const token = await generateJWT(newUser.id)
        res.status(200).json({ msg: 'Signup successful', token });

       



    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg: `Please try again later. If you still cannot, speak to the administrator.`
        })

    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Exists email?
        const user = await User.findOne({
            where: { email },
            paranoid: false
        })


        if (!user || user.deleted_at) {
            return res.status(400).json({ msg: `User doesn't exists` });
        }


        // is a right password?
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        // generate a JWT

        const token = await generateJWT(user.id)
        res.status(200).json({ msg: 'Login successful', token });

    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg: `Please try again later. If you still cannot, speak to the administrator.`
        })

    }
}


module.exports = {
    login,
    signin
}
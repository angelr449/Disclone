const { response } = require("express");
const User = require("../models/User");




const signin = async (req, res = response) => {

    const { name, email, password, repeatPassword } = req.body;

    try {
        // if(!name & !email & !password & !repeatPasswod){
        //     return res.status(401).json({msg:'Please fill in the parameters'})
        // }
        if (password != repeatPassword) {
            return res.status(401).json({ msg: 'Passwords do not match' });

        }

        const user = await User.findOne({
            where: { email },
            paranoid: false
        });

        if(user){
            return res.status(409).json({ msg: 'Email already in use' });
        }



        const newUser = await User.create({
            name, email, password
        });

        res.status(201).json({ msg: 'User created', user: newUser });



    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ msg: 'Email already in use' });
        }

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

        if (!user) {
            return res.status(400).json({ msg: `User doesn't exists` });
        }

        if (user.deleted_at) {

            return res.status(400).json({ msg: `User doesn't exists` });
        }


        // const validPassword = await bcry

    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg: `Please try again later. If you still cannot, speak to the administrator.`
        })

    }
}

const lg = () => {

    res.status(200).json({ msg: 'hiii' })
}
module.exports = {
    login,
    signin,
    lg
}
const { response } = require("express");
const bcrypt = require('bcryptjs')
const { User } = require("../models");
const { generateJWT } = require("../helpers/generate-jwt");


//TODO activar JWT cuando se hace un regist

const lg = () => {

    res.status(200).json({ msg: 'hiii' })
}
module.exports = {
    login,
    signup,
    lg
}
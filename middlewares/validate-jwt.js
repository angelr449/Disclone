const { response } = require("express");

const jwt = require('jsonwebtoken');
const { User } = require("../models");

const validateJWT = async(req, res = response, next)=>{

    const token = req.header('x-token');

    if(!token){

        return res.status(401).json({
            msg: "No token in the request" 
        });

    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Read the correct user and do uid have a  status:true?
        const user = await User.findByPk(uid);

        if(!user ){
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }

        req.user = user;

        next();

        
        
        

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
        
    }


}

module.exports ={
    validateJWT
}
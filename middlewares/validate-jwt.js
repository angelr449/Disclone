const { response } = require("express");

const jwt = require('jsonwebtoken');
const { User } = require("../models");


const verifyJWT = async(token)=>{
    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Read the correct user and do uid have a  status:true?
        const user = await User.findByPk(uid);

        if(!user ){
            return null;
        }

        return user;
        

        
        
        

    } catch (error) {

        return null;
        
    }

}

const validateJWT = async(req, res = response, next)=>{

    const token = req.header('x-token');

    if(!token){

        return res.status(401).json({
            msg: "No token in the request" 
        });

    }

    try {
        const user =  await verifyJWT(token);
        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
        
    }

    

}

const validateSocketJWT = async(token)=>{
    if(!token) return null;

    try {
        return await verifyJWT(token);
        
    } catch (error) {
        return null;
    }
    
    

}

module.exports ={
    validateJWT,
    validateSocketJWT
}
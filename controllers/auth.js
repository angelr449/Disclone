const { response } = require("express");



const login = async(req, res = response)=>{

    const {email, password} = req.body;

    try {

        // Exists email?

        const user = await User.findOne({where: {email}});

        if(!user){
            return res.status(400).json({msg: `User doesn't exists`});
        }


        // const validPassword = await bcry
        
    } catch (error) {
        
    }
}
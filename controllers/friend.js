const { response } = require("express");
const { Friend } = require("../models");
const { Op, or } = require("sequelize");




const getFriends = async(req, res=response)=>{

    const {user} = req;

    try {
        const friendList = await Friend.findAll({
            where:{
                [Op.or]:[
                    {requester_id: user.id},
                    {receiver_id: user.id}
                ],
                status_id: 2 //accepted

            }
        });

        res.status(200).json({friends: friendList});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Please try again later.' });
    }


}



// const getFriendsPending = (req, res=response)=>{


// }


// const sendFriendRequest = (req, res=response)=>{


// }

// const respondFriendRequest = (req, res=response)=>{


// }



module.exports={
    getFriends,
    // getFriendsPending,
    // sendFriendRequest,
    // respondFriendRequest,

}
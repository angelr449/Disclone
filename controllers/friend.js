const { response } = require("express");
const { Friend } = require("../models");
const { Op } = require("sequelize");




const getFriends = async (req, res = response) => {

    const { user } = req;

    if (!user) return res.status(401).json({ msg: 'Unauthorized' });

    try {
        const friendList = await Friend.findAll({
            where: {
                [Op.or]: [
                    { requester_id: user.id },
                    { receiver_id: user.id }
                ],
                status_id: 2 //accepted

            }
        });

        res.status(200).json({ friends: friendList });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Please try again later.' });
    }


}



const getFriendsPending = (req, res=response)=>{

    const {user} = req;
    if (!user) return res.status(401).json({ msg: 'Unauthorized' });


}


const sendFriendRequest = async (req, res = response) => {
    const { user } = req;
    const { friendId } = req.body;
    if (!user) return res.status(401).json({ msg: 'Unauthorized' });

    try {

        const newFriendRequest = await Friend.create({
            requester_id: user.id,
            receiver_id: friendId,
            status_id: 1,
        })
        res.status(201).json({ msg: 'Friend request sent', request: newFriendRequest });


    } catch (error) {


        console.log(error);
        res.status(500).json({ msg: 'Please try again later.' });
    }


}

// const respondFriendRequest = (req, res=response)=>{


// }



module.exports = {
    getFriends,
    // getFriendsPending,
    sendFriendRequest,
    // respondFriendRequest,

}
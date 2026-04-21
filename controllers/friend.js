const { response } = require("express");
const { Friend, User } = require("../models");
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



const getFriendsPending = async (req, res = response) => {

    const { user } = req;
    if (!user) return res.status(401).json({ msg: 'Unauthorized' });


    try {

        const friendsPendingList = await Friend.findAll({
            where: {
                receiver_id: user.id,
                status_id: 1,
            }
        })

        res.status(200).json({ msg: 'Friends Peding List', friendsPendingList });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Please try again later.' });
    }


}


const sendFriendRequest = async (req, res = response) => {
    const { user } = req;
    const { friendId } = req.body;
    if (!user) return res.status(401).json({ msg: 'Unauthorized' });

    
    try {
        const existFriendId = await User.findByPk(friendId);

    if (!existFriendId) return res.status(404).json({ msg: 'User not found' });


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

const respondFriendRequest = async (req, res = response) => {
    const { user } = req;
    const { requestId } = req.params;
    const requestStatus = Number(req.body.requestStatus);

    if (!user) return res.status(401).json({ msg: 'Unauthorized' });




    try {

        const newRepondFriendRequest = await Friend.findOne({
            where: {
                id: requestId,
                receiver_id: user.id,
                status_id: 1
            }
        })
        if (!newRepondFriendRequest) return res.status(404).json({ msg: 'Friend request not found' });
        if (requestStatus === 2) {
            await newRepondFriendRequest.update({ status_id: 2 });
        } else if (requestStatus === 3) {
            await newRepondFriendRequest.update({ status_id: 3 });

        } else {
            return res.status(404).json({ msg: `status_id with id:${requestStatus} not found` });
        }

        res.status(200).json({ msg: 'Friend request updated' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Please try again later.' });
    }





}



module.exports = {
    getFriends,
    getFriendsPending,
    sendFriendRequest,
    respondFriendRequest,

}
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
                status_id: 2
            },
            include: [
                { model: User, as: 'requester', attributes: ['id', 'name', 'avatar'] },
                { model: User, as: 'receiver', attributes: ['id', 'name', 'avatar'] }
            ]
        });

        // Devuelve solo el otro usuario
        const friends = friendList.map(f => {
            return f.requester_id === user.id ? f.receiver : f.requester;
        });

        res.status(200).json({ friends });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Please try again later.' });
    }
};



const getFriendsPending = async (req, res = response) => {
    const { user } = req;

    try {
        const friendsPendingList = await Friend.findAll({
            where: {
                status_id: 1,
                [Op.or]: [
                    { requester_id: user.id },
                    { receiver_id: user.id }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'requester',
                    attributes: ['id', 'name', 'email', 'avatar']
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['id', 'name', 'email', 'avatar']
                }
            ]
        });

        return res.status(200).json({
            msg: 'Friends Pending List',
            friendsPendingList
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Please try again later.'
        });
    }
};

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
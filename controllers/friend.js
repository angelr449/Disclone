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

    if (!user) {
        return res.status(401).json({
            msg: 'Unauthorized'
        });
    }

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

        const friendsPendingListFormatted = friendsPendingList.map(friend => ({
            id: friend.id,
            requester_id: friend.requester_id,
            receiver_id: friend.receiver_id,
            status_id: friend.status_id,
            type: friend.requester_id === user.id ? 'sent' : 'received',
            requester: friend.requester,
            receiver: friend.receiver
        }));

        return res.status(200).json({
            msg: 'Friends Pending List',
            friendsPendingList: friendsPendingListFormatted
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

    if (!user) {
        return res.status(401).json({
            msg: 'Unauthorized'
        });
    }

    try {
        const receiverId = Number(friendId);

        // Evitar enviarse solicitud a sí mismo
        if (user.id === receiverId) {
            return res.status(400).json({
                msg: 'You cannot send a friend request to yourself'
            });
        }

        // Verificar que el usuario exista
        const existFriendId = await User.findByPk(receiverId);

        if (!existFriendId) {
            return res.status(404).json({
                msg: 'User not found'
            });
        }

        // Buscar si ya existe alguna relación entre ambos usuarios
        const existingRequest = await Friend.findOne({
            where: {
                [Op.or]: [
                    {
                        requester_id: user.id,
                        receiver_id: receiverId
                    },
                    {
                        requester_id: receiverId,
                        receiver_id: user.id
                    }
                ]
            }
        });

        if (existingRequest) {

            // Solicitud pendiente
            if (existingRequest.status_id === 1) {
                return res.status(409).json({
                    msg: 'Friend request already pending'
                });
            }

            // Ya son amigos
            if (existingRequest.status_id === 2) {
                return res.status(409).json({
                    msg: 'Users are already friends'
                });
            }

            // Reenviar solicitud rechazada
            if (existingRequest.status_id === 3) {
                await existingRequest.update({
                    requester_id: user.id,
                    receiver_id: receiverId,
                    status_id: 1
                });

                return res.status(200).json({
                    msg: 'Friend request sent again',
                    request: existingRequest
                });
            }
        }

        // Crear nueva solicitud
        const newFriendRequest = await Friend.create({
            requester_id: user.id,
            receiver_id: receiverId,
            status_id: 1
        });

        return res.status(201).json({
            msg: 'Friend request sent',
            request: newFriendRequest
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Please try again later.'
        });
    }
};

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


const removeFriend = async (req, res = response) => {
    const { user } = req;
    const { friendId } = req.params;

    if (!user) {
        return res.status(401).json({
            msg: 'Unauthorized'
        });
    }

    try {

        const friendship = await Friend.findOne({
            where: {
                status_id: 2,
                [Op.or]: [
                    {
                        requester_id: user.id,
                        receiver_id: friendId
                    },
                    {
                        requester_id: friendId,
                        receiver_id: user.id
                    }
                ]
            }
        });

        if (!friendship) {
            return res.status(404).json({
                msg: 'Friendship not found'
            });
        }

        await friendship.destroy();

        return res.status(200).json({
            msg: 'Friend removed'
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'Please try again later.'
        });
    }
};
module.exports = {
    getFriends,
    getFriendsPending,
    sendFriendRequest,
    respondFriendRequest,
    removeFriend

}
const { response } = require("express");
const { Message } = require("../models");



const getMessages = async (req, res = response) => {
    const { chatId } = req.params;
    const {user} = req;

    if (!chatId) return res.status(404).json({ msg: 'Chat not found', chatId });
    try {
        const isMember = await ChatMember.findOne({
            where: { chat_id: chatId, user_id: user.id }
        });
        if (!isMember) return res.status(403).json({ msg: 'Access denied' });
        const historialChat = await Message.findAll({
            where: {
                chat_id: chatId
            },
            include:[{
                model: User,
                as: 'sender',
                attributes: ['id', 'name', 'avatar']
            }]
        });

        return res.status(200).json({ msg: 'Chat', historialChat });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Please try again later. If you still cannot, speak to the administrator.`
        })

    }


}


const deleteMessage = () => {

}


const editMessage = () => {


}



module.exports = {

    getMessages,
    deleteMessage,
    editMessage,
}
const { response } = require("express")
const { Chat, User, ChatMember } = require("../models")




const createChat = async (req, res = response) => {

    const { type, name } = req.body;
    const { user } = req;

    try {
        if (!['dm', 'server', 'group'].includes(type)) {

            return res.status(400).json({ msg: 'Invalid chat type ' })
        }


        if (!name.trim()) {
            return res.status(400).json({ msg: 'There is not a name' })
        }

        const newChat = await Chat.create({
            type,
            name

        })

        await ChatMember.create({
            chat_id: newChat.id,
            user_id: user.id
        })

        res.status(201).json({ msg: 'Chat created', chat: newChat });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Please try again later. If you still cannot, speak to the administrator.`
        })

    }



}


const getChat = async (req, res = response) => {
    const { user } = req;



    try {
        const allChats = await Chat.findAll({
            include:[{
                model: User,
                where: {id: user.id},
                through: {attributes:[]}
            }]
        });
        res.status(200).json({ chats: allChats });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Please try again later.' });
    }


}


const getMembersChat = () => {

}

module.exports = {
    createChat,
    getChat,
    getMembersChat

}
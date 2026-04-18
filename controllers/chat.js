const { response } = require("express")
const { Chat } = require("../models")




const createChat = async (req, res = response) => {

    const { type, name } = req.body;

    try {
        if (!['dm', 'server', 'group'].includes(type)) {

            return res.status(400).json({ msg: 'Invalid chat type ' })
        }


        if(!name.trim()){
            return res.status(400).json({msg: 'There is not a name'})
        }

        const newChat = await Chat.create({
            type,
            name

        })

        res.status(201).json({ msg: 'Chat created', chat: newChat });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Please try again later. If you still cannot, speak to the administrator.`
        })

    }



}


const getChat = () => {


}


const getMembersChat = () => {

}

module.exports = {
    createChat,
    getChat,
    getMembersChat

}
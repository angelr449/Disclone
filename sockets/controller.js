const { validateSocketJWT } = require("../middlewares/validate-jwt");
const { Message } = require("../models");






const socketController = async (socket, io) => {

    const user = await validateSocketJWT(socket.handshake.headers['x-token']);

    if (!user) {
        return socket.disconnect();
    }

    // Join a chat
    socket.on('joinChat', (chatId)=>{
        socket.join(chatId);
    })

    // Send message

    socket.on('sendMessage', async({chatId, content})=>{
        try {
            const newMessage = await Message.create({
                chat_id: chatId,
                sender_id: user.id,
                content
            });

            io.to(chatId).emit('newMessage', newMessage);
        } catch (error) {
            console.log(error)
            
        }
    })

   


}




module.exports = {
    socketController
}
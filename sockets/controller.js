const { validateSocketJWT } = require("../middlewares/validate-jwt");
const { Message } = require("../models");

const socketController = async (socket, io) => {
    const token = socket.handshake.auth.token;

    const user = await validateSocketJWT(token);

    if (!user) {
        return socket.disconnect();
    }

    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
    });

    socket.on('sendMessage', async ({ chatId, content }) => {
        try {
            const newMessage = await Message.create({
                chat_id: chatId,
                sender_id: user.id,
                content
            });
            io.to(chatId).emit('newMessage', newMessage);
        } catch (error) {
        }
    });
};

module.exports = {
    socketController
};
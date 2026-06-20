const { validateSocketJWT } = require("../middlewares/validate-jwt");
const { Message } = require("../models");
const { addOnlineUser, removeOnlineUser, getOnlineUserIds } = require("./online-users");

const socketController = async (socket, io) => {

    const user = await validateSocketJWT(socket.handshake.auth.token);

    if (!user) {
        return socket.disconnect();
    }

    // Mark this user as online
    addOnlineUser(user.id, socket.id);

    // Notify everyone else that this user is online
    io.emit('userOnline', user.id);

    // Send the full current online list to the user who just connected
    socket.emit('onlineUsers', getOnlineUserIds());

    // Join a chat
    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
    });

    // Send message
    socket.on('sendMessage', async ({ chatId, content }) => {
        try {
            if (!chatId || !content?.trim()) return;

            const newMessage = await Message.create({
                chat_id: chatId,
                sender_id: user.id,
                content: content.trim()
            });

            io.to(chatId).emit('newMessage', newMessage);
        } catch (error) {
            console.log(error);
        }
    });

    // Disconnect
    socket.on('disconnect', () => {
        removeOnlineUser(user.id, socket.id);
        io.emit('userOffline', user.id);
    });
}

module.exports = {
    socketController
}
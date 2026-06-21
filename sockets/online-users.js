// sockets/online-users.js
const onlineUsers = new Map(); // userId -> Set de socketIds (por si tiene varias pestañas/dispositivos)

const addOnlineUser = (userId, socketId) => {
    if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socketId);
};

const removeOnlineUser = (userId, socketId) => {
    const sockets = onlineUsers.get(userId);
    if (!sockets) return;

    sockets.delete(socketId);

    if (sockets.size === 0) {
        onlineUsers.delete(userId);
    }
};

const getOnlineUserIds = () => {
    return Array.from(onlineUsers.keys());
};

module.exports = {
    addOnlineUser,
    removeOnlineUser,
    getOnlineUserIds,
};
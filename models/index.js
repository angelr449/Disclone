const Chat = require("./Chat")
const ChatMember = require("./ChatMember")
const User = require("./User")
const Message = require("./Message");
const Friend = require("./Friend");
const FriendRequestStatus = require("./FriendRequestStatus");



// User => Chat

User.belongsToMany(Chat, {through: ChatMember, foreignKey: 'user_id'});
Chat.belongsToMany(User, {through: ChatMember, foreignKey: 'chat_id'});

// Chat => Message

Chat.hasMany(Message, {foreignKey: 'chat_id'});
Message.belongsTo(Chat, {foreignKey: 'chat_id'});

// User => Message (sender)

User.hasMany(Message, {foreignKey: 'sender_id'});
Message.belongsTo(User, {foreignKey: 'sender_id', as:'sender'});

// User => ChatMember

User.hasMany(ChatMember, { foreignKey: 'user_id' });
ChatMember.belongsTo(User, { foreignKey: 'user_id' });

// Chat => ChatMember

Chat.hasMany(ChatMember, { foreignKey: 'chat_id' });
ChatMember.belongsTo(Chat, { foreignKey: 'chat_id' });

// Friend => FriendRequestStatus

FriendRequestStatus.hasMany(Friend, { foreignKey: 'status_id' });
Friend.belongsTo(FriendRequestStatus, { foreignKey: 'status_id' });

// User => Friend (requester)

User.hasMany(Friend, { foreignKey: 'requester_id', as: 'sentRequests' });
Friend.belongsTo(User, { foreignKey: 'requester_id', as: 'requester' });

// User => Friend (receiver)

User.hasMany(Friend, { foreignKey: 'receiver_id', as: 'receivedRequests' });
Friend.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

module.exports = { User, Chat, ChatMember, Message, Friend, FriendRequestStatus };
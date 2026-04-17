const Chat = require("./Chat")
const ChatMember = require("./ChatMember")
const User = require("./User")
const Message = require("./Message");



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

module.exports = { User, Chat, ChatMember, Message };
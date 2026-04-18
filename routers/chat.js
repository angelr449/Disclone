const { Router } = require("express");
const { pruebaChat, createChat, getChat, getMembersChat } = require("../controllers/chat");





const router = Router();


router.post('/create-chat', [


],createChat);

router.get('/get-chat',[

], getChat);

router.get('/get-members-chat:chatId',[

], getMembersChat)


module.exports = router;
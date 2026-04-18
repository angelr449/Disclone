const { Router } = require("express");
const { createChat, getChat, getMembersChat } = require("../controllers/chat");
const { check } = require("express-validator");





const router = Router();


router.post('/create-chat', [
    check('name', 'name is required').not().isEmpty(),
    check('type', 'type is required').not().isEmpty(),


], createChat);

router.get('/get-chat', [

], getChat);

router.get('/get-members-chat:chatId', [

], getMembersChat)


module.exports = router;
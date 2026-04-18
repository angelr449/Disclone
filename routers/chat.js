const { Router } = require("express");
const { createChat, getChat, getMembersChat } = require("../controllers/chat");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");





const router = Router();
//TODO crear addMember

router.post('/create-chat', [
    check('name', 'name is required').not().isEmpty(),
    check('type', 'type is required').not().isEmpty(),
    validateJWT,


], createChat);

router.get('/get-chat', [
    validateJWT
], getChat);

router.get('/get-members-chat:chatId', [

], getMembersChat)


module.exports = router;
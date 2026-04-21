const { Router } = require("express");
const { createChat, getChat, getMembersChat, chatAddMember } = require("../controllers/chat");
const { check, param, body } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
const {valideteFields} = require('../middlewares/validate-fields');




const router = Router();


router.post('/create-chat', [
    check('name', 'name is required').not().isEmpty(),
    check('type', 'type is required').not().isEmpty(),
    validateJWT,
    valideteFields
    


], createChat); 

router.post('/:chatId/add-member',[
    param('chatId', 'chatId must be a number').isInt(),
    body('userId', 'userId must be a number').isInt(),

    validateJWT,
    valideteFields
], chatAddMember);

router.get('/get-chat', [
    validateJWT
], getChat);

router.get('/get-members-chat/:chatId', [
    param('chatId', 'chatId must be a number').isInt(),

    validateJWT,
    valideteFields

], getMembersChat)


module.exports = router;
const { Router } = require("express");
const { createChat, getChat, getMembersChat, chatAddMember } = require("../controllers/chat");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
const {valideteFields} = require('../middlewares/validate-fields');




const router = Router();
//TODO crear addMember

router.post('/create-chat', [
    check('name', 'name is required').not().isEmpty(),
    check('type', 'type is required').not().isEmpty(),
    validateJWT,
    valideteFields
    


], createChat);

router.post('/:chatId/add-member',[

    validateJWT,
    valideteFields
], chatAddMember);

router.get('/get-chat', [
    validateJWT
], getChat);

router.get('/get-members-chat/:chatId', [

    validateJWT,
    valideteFields

], getMembersChat)


module.exports = router;
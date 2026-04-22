
const { Router } = require("express");

const { check, param } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
;
const { getFriends, sendFriendRequest, getFriendsPending, respondFriendRequest } = require("../controllers/friend");
const { getMessages, deleteMessage, editMessage } = require("../controllers/message");
const { valideteFields } = require("../middlewares/validate-fields");

const router = Router();


router.get('/:chatId',[
    validateJWT,
    valideteFields,

], getMessages);


router.delete('/:messageId',[
    validateJWT,
    valideteFields,

], deleteMessage);


router.put('/:messageId',[
    validateJWT,
    valideteFields,

], editMessage);



module.exports = router;

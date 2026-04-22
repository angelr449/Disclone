
const { Router } = require("express");

const { check, param } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
;

const { getMessages, deleteMessage, editMessage } = require("../controllers/message");
const { valideteFields } = require("../middlewares/validate-fields");

const router = Router();


router.get('/:chatId',[

    param('chatId', 'chatId is required').not().isEmpty(),
    param('chatId', 'chatId must be a number').isInt(),
    validateJWT,
    valideteFields,

], getMessages);


router.delete('/:messageId',[
     param('messageId', 'messageId is required').not().isEmpty(),
    param('messageId', 'messageId must be a number').isInt(),
    validateJWT,
    valideteFields,

], deleteMessage);


router.put('/:messageId',[
    param('messageId', 'messageId is required').not().isEmpty(),
    param('messageId', 'messageId must be a number').isInt(),
    check('newContent', 'newContent is required').not().isEmpty(),
    check('newContent', 'newContent should be a string').isString(),

    validateJWT,
    valideteFields,

], editMessage);



module.exports = router;

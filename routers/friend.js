const { Router } = require("express");
const { createChat, getChat, getMembersChat, chatAddMember } = require("../controllers/chat");
const { check, param, body } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
const { valideteFields } = require('../middlewares/validate-fields');
const { getFriends, sendFriendRequest, getFriendsPending, respondFriendRequest } = require("../controllers/friend");

const router = Router();


router.get('/get-friends', [
    validateJWT,
    valideteFields,
],  getFriends);

router.get('/pending',[
    validateJWT,
    valideteFields,
],  getFriendsPending);

router.post('/send-request',[
    validateJWT,
    valideteFields,
], sendFriendRequest);

router.put('/:requestId/respond',[


    validateJWT,
    valideteFields
], respondFriendRequest)



module.exports = router;
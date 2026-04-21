const { Router } = require("express");
const { createChat, getChat, getMembersChat, chatAddMember } = require("../controllers/chat");
const { check, param, body } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
const { valideteFields } = require('../middlewares/validate-fields');
const { getFriends, sendFriendRequest } = require("../controllers/friend");

const router = Router();


router.get('/get-friends', [
    validateJWT,
    valideteFields,
],  getFriends);

// router.get('/pending',[
//     validateJWT,
//     valideteFields,
// ], );

router.post('/send-request',[
    validateJWT,
    valideteFields,
], sendFriendRequest);

// router.put('/:requestId/respond',[

// ],)



module.exports = router;
const { Router } = require("express");

const { check, param } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
const { valideteFields } = require('../middlewares/validate-fields');
const { getFriends, sendFriendRequest, respondFriendRequest, getFriendsPending, removeFriend } = require("../controllers/friend");

const router = Router();


router.get('/get-friends', [
    validateJWT,
    valideteFields,
], getFriends);

router.get('/pending', [
    validateJWT,
    valideteFields,
], getFriendsPending);

router.post('/send-request', [
    check('friendId', 'friendId is requried').not().isEmpty(),
    check('friendId', 'friendId should be a int').isInt(),
    validateJWT,
    valideteFields,
], sendFriendRequest);

router.put('/:requestId/respond', [
    param('requestId', 'requestId is required').not().isEmpty(),
    param('requestId', 'requestId should be a int').isInt(),
    check('requestStatus', 'requestStatus is required').not().isEmpty(),
    check('requestStatus', 'requestStatus should be a int').isInt(),


    validateJWT,
    valideteFields
], respondFriendRequest);

router.delete('/:requestId/delete',
    [
        param('requestId', 'requestId is required').not().isEmpty(),
        param('requestId', 'requestId should be a int').isInt(),
        check('requestStatus', 'requestStatus is required').not().isEmpty(),
        check('requestStatus', 'requestStatus should be a int').isInt(),


        validateJWT,
        valideteFields
    ], removeFriend);



module.exports = router;
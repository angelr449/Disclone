
const { Router } = require("express");

const { check, param } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");

const { valideteFields } = require("../middlewares/validate-fields");

const router = Router();

router.get('/me',[

    validateJWT,
    valideteFields,

], deleteMessage);
router.get('/:id',[

    validateJWT,
    valideteFields,

], getMessages);







module.exports = router;

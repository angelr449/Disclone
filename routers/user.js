
const { Router } = require("express");

const { check, param } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");

const { valideteFields } = require("../middlewares/validate-fields");
const { getUserByToken, getUserById } = require("../controllers/user");

const router = Router();

router.get('/me',[

    validateJWT,
    valideteFields,

], getUserByToken);
router.get('/:id',[

    validateJWT,
    valideteFields,

], getUserById);







module.exports = router;

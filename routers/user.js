
const { Router } = require("express");

const { check, param } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");

const { valideteFields } = require("../middlewares/validate-fields");
const { getUserByToken, getUserById, getUserByName } = require("../controllers/user");

const router = Router();

router.get('/me', [

    validateJWT,
    valideteFields,

], getUserByToken);
router.get('/:id', [
    param('id', 'is required').isInt(),
    validateJWT,
    valideteFields,

], getUserById);

router.get('/search/:name', [
    param('name', 'is required').notEmpty(),
    validateJWT,
    valideteFields,

], getUserByName);





module.exports = router;

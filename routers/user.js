
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

router.get('/search/:name', [
    validateJWT,
    param('name', 'is required').notEmpty(),
    valideteFields,

], getUserByName);

router.get('/:id', [
    validateJWT,
    param('id', 'is required').isInt(),
    valideteFields,

], getUserById);






module.exports = router;

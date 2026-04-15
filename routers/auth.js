const { Router } = require("express");
const { valideteFields } = require("../middlewares/validate-fields");
const { login, signin, lg } = require("../controllers/auth");
const { check } = require("express-validator");


const router = Router();


router.post('/signin',[
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('repeatPassword', 'repeatPassword is required').not().isEmpty(),
    


],signin)

router.post('/login',[
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
valideteFields],
login); 

// router.get('/login', [],lg) 

module.exports = router;

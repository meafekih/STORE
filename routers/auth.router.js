const router = require('express').Router()
const authcontroller = require('../controllers/auth.controller')
const bodyParser = require('body-parser')
const check = require('express-validator').check


router.get('/signup', authcontroller.signup)
router.post('/signup',
 bodyParser.urlencoded({extended:true}),
 check('email').not().isEmpty().isEmail().withMessage('Email not valid'),
 check('confirm-password').custom((value, meta)=>{
    if (meta.req.body.password === value) return true
    else throw 'password is not equals'
 }).withMessage('password is not equals'),  
 authcontroller.createUser)

router.get('/login',authcontroller.getLogin)
router.post('/login', bodyParser.urlencoded({extended:true}), authcontroller.authentifier)

router.all('/logout', authcontroller.logout)




module.exports = router
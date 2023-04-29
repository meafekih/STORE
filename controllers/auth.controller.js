
const { reject } = require('promise')
const authModel = require('../models/auth.model')
const validationResult = require('express-validator').validationResult

// SignUp
exports.signup = (req, res)=>{res.render('signup', {"createUserError": req.flash('createUserError')[0]})}
exports.createUser = ((req, res)=>{
    return console.log(validationResult(req).array())
    authModel.createUser(req.body.username, req.body.email, req.body.password)
    .then(()=> {
        res.redirect('/login')
    })
    .catch((err)=>{
        req.flash('createUserError', err)
        res.redirect('/signup')
    })
})

exports.getLogin=(req, res)=>{res.render('login')}
exports.authentifier = ((req, res)=>{
    authModel.login(req.body.email, req.body.password)
    .then((id)=>{
        req.session.userId = id
        res.status(200).json({
            result: 1
        })
        // res.redirect('/signup')
    })
    .catch(err=> {
        console.log(err)
        res.status(404).json({
            result : 0
        })
        // res.render('login')
        
    })
   
})

exports.logout = (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}
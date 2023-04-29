const mongoose = require('mongoose');
const { resolve, reject } = require('promise');
const bycript = require('bcrypt')

const uri = 'mongodb://127.0.0.1:27017/shop'
const User = mongoose.model('user', mongoose.Schema({
    username: String,
    email : String,
    password: String,
}));


exports.createUser= ((username, email, password)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(uri)
        .then(()=>{
            return User.findOne({email:email})
        }).then(user=>{
            if(user){
                mongoose.disconnect()
                reject('Email already exist ! ')
            }else{
                return bycript.hash(password,10)
            }
        }).then(hached_password=>{
            let us = new User({
                username: username,
                email: email,
                password : hached_password
            })
            return us.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve('User Saved')
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    });
})

exports.login = (email, password)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(uri)
        .then(()=>{
            return User.findOne({email:email})
        })
        .then(user=>{
            if(!user){
                mongoose.disconnect()
                reject('Email not existing')
            } else{
                return bycript.compare(password, user.password).then(correct=>{
            if(!correct){
                mongoose.disconnect()
                reject('Password is incorrect')
            } else {
                mongoose.disconnect()
                resolve(user._id)
            }
        })
        }
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}





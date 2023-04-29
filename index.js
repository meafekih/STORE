const express = require('express')
const path = require('path')
const app = express()
const homeRouter = require('./routers/home.router')
const productRouter = require('./routers/product.router')
const authRouter = require('./routers/auth.router')
const session = require('express-session')
const sessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname,'/assets')))
app.use(express.static(path.join(__dirname,'/images')))
app.use(flash())
app.use(session({
    secret:'This is a text for decrype coockies',
    saveUninitialized : false,
    resave: true,
    cookie : {
        maxAge: 1*60*60*100,//defaul close all navigator
    },
    store : new sessionStore({
        uri : 'mongodb://127.0.0.1:27017/shop',
        collection : 'sessions'
    })
}))

app.use('/', homeRouter)
app.use('/product', productRouter)
app.use('/', authRouter)


app.listen(3000,()=>{
    console.log('Server listen at port 3000')
})
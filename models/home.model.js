const promise = require('promise')
const mongoose = require('mongoose')
const uri = 'mongodb://127.0.0.1:27017/shop'

const products = mongoose.model('product', mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    image : String
}))

exports.getAllProducts=()=>{
    return new promise((resolve, reject)=>{
        mongoose.connect(uri).then(()=>{
            return products.find({})
        }).then(products=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err=>reject(err))
    })
}

exports.getProductsByCategory=(cat)=>{
    return new promise((resolve, reject)=>{
        mongoose.connect(uri).then(()=>{
            return products.find({category:cat})
        }).then(products=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err=>reject(err))
    })
}

exports.getProductsById=(id)=>{
    return new promise((resolve, reject)=>{
        mongoose.connect(uri).then(()=>{
            return products.findById(id)
        }).then(product=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err=>reject(err))
    })
}
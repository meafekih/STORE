 const productModel = require('../models/home.model')


exports.getProduct = (req, res)=>{
    productModel.getProductsById(req.params.id)
    .then(product=>{
        // res.status(200).json({
        // "name": product.name,
        // "price": product.price,
        // "category": product.category,
        // "description": product.description,
        // "image": product.image,
        // })
        res.render('product',{product : product})
    })
    
}
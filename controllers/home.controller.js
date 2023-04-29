const productModel = require('../models/home.model')

exports.getHome = (req, res)=>{
    console.log(req.session.userId)
    let category = req.query.category
    let validCategory=['auhter','phone','pc']
    let prductsPrimise 
    if(category && validCategory.includes(category))
        prductsPrimise = productModel.getProductsByCategory(category)
    else
        prductsPrimise = productModel.getAllProducts()

    prductsPrimise.then(products=>{res.render('home',{products : products})})
    
};
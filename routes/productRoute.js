const Router = require('express').Router();
const products = require('../index');


Router.get('/',(req, res)=>{

    try{
        products.find({}).toArray((err, res=>{
            if (err) throw err;
            console.log(res);
        }))
    } catch (err) {
        console.log(err);
     }
})

module.exports = Router;
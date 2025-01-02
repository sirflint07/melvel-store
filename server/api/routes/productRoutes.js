const express = require('express')
const ProductRouter = express.Router()
const routes = require('../controllers/productContoller')

ProductRouter.get('/api/products', routes.getSneakers)

ProductRouter.post('/api/products', routes.postSneaker)

module.exports = ProductRouter;
const express = require('express')
const UserRouter = express.Router()
const routes = require('../controllers/userController')


UserRouter.post('/api/login', routes.logUser)

UserRouter.get('/api/users', routes.getUsers)

UserRouter.post('/api/signup', routes.createUser)

UserRouter.patch('/api/signup/:id', routes.updateUser)

UserRouter.delete('/api/signup/:id', routes.deleteUser)

module.exports = UserRouter;
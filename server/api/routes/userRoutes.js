const express = require('express')
const UserRouter = express.Router()
const routes = require('../controllers/userController')

UserRouter.post('/api/forgot-password', routes.forgotPassword)

UserRouter.post('/api/reset-password:token', routes.resetPassword)

UserRouter.post('/api/login', routes.logUser)

UserRouter.post('/api/signup/verify-email', routes.verifyUser)

UserRouter.get('/api/logout', routes.logoutUser)

UserRouter.get('/api/users', routes.getUsers)

UserRouter.post('/api/signup', routes.createUser)

UserRouter.patch('/api/signup/:id', routes.updateUser)

UserRouter.delete('/api/signup/:id', routes.deleteUser)

module.exports = UserRouter;
const express = require('express')
const UserRouter = express.Router()
const routes = require('../controllers/userController')
const { verifyToken } = require('../middleware/verifyToken')

UserRouter.post('/api/reset-password/:token', routes.resetPassword)

UserRouter.post('/api/forgot-password', routes.forgotPassword)

UserRouter.post('/api/login', routes.logUser)

UserRouter.post('/api/signup/verify-email', routes.verifyUser)

UserRouter.get('/api/logout', routes.logoutUser)

UserRouter.get('/api/users', routes.getUsers)

UserRouter.post('/api/signup', routes.createUser)

UserRouter.get('/api/check-auth', verifyToken, routes.checkAuth)

UserRouter.get('/api/checkout', routes.checkAuthentication)

UserRouter.get('/api/users/:id', routes.getUser)

// UserRouter.patch('/api/signup/:id', routes.updateUser)

// UserRouter.delete('/api/signup/:id', routes.deleteUser)

module.exports = UserRouter;
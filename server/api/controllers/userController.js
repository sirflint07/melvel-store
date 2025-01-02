const User =  require('../models/userSchema')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    let errors = {name: '', username: '', state: '', address: '', email: '', password: ''}
    
    // duplicate key error
    if (err.code === 11000 | err.message.includes('duplicate key error')) {
       errors.username = 'Username already exist'
       errors.email = 'email is already registered'
        
       return errors
    }

    // custom error messages
    if (err.message.includes('User validation failed' || err.message.includes('Password'))) {
        Object.values(err.errors).forEach((error) => {
            errors[error.properties.path] = error.properties.message
        })
        return errors
    }

    if (err.message.includes('Password')) {
        errors.password = 'Password should be a minimum of 6 characters';
        return errors
    }
    return errors
}

const maxAge = 7 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    })
}

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find({}, {email: 1, username: 1, password: 1})
            if (!users || users.length === 0) {
                
                return res.status(404).json({msg: 'no user in db'})
            }
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json(error)
        }
    },

    createUser: async (req, res) => {
        
        const body = req.body
        try {
            const user = await User.create(body)
            const jwtToken =  createToken(user._id)
            res.cookie('token', jwtToken, {
                httpOnly: true, // Prevent access from JavaScript
                secure: true, // Set to true if using HTTPS
                sameSite: 'None', // Required for cross-origin cookies
            });
            if(user) {
                return res.status(200).json(user.id)
            }
            return res.status(400).json({msg: 'user could not be created'})
        } catch (err) {
            errorObject = handleErrors(err)
            return res.status(400).json(errorObject)
        }
    },

    deleteUser: async (req, res) => {
        const id = req.params.id
        try {
            const user = await User.findByIdAndDelete(id)
            if(!user) {
               return res.status(400).json({msg: 'user not found'})
            }
            return res.status(200).json(user)
        } catch (error) {
            res.status(404).json(error.message)
        }
    },

    updateUser: async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const user = await User.findByIdAndUpdate(id, body)
            if(!user) {
                return res.status(400).json({msg: 'user not found'})
            }
            res.status(200).json(user)
            
        } catch (error) {
            res.status(400).json(error.message)
        }
    },

    logUser: async (req, res) => {
        const {email, password} = req.body
        try {
            const user = await User.login(email, password)
            if (user) {
                return res.status(200).json({user: user._id})
            }
        } catch (err) {
            errorObject = handleErrors(err)
            return res.status(400).json(errorObject)
        }
    }
}
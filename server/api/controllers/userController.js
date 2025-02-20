const { sendVerificationEmail, sendWelcomeEmail, sendResetEmail } = require('../../mailtrap/sendEmail')
const User =  require('../models/userSchema')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt =  require('bcrypt')

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

const maxAge = Date.now() + (7 * 24 * 60 * 60)
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
        // receive user input from the request object
        const body = req.body
        try {

            const user = await User.create(body)

            // call function to create a jwt token
            const jwtToken =  createToken(user._id)

            // create a cookie
            res.cookie('token', jwtToken, {
                httpOnly: true, // Prevent access from JavaScript
                secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
                sameSite: 'strict', // Required for cross-origin cookies
                maxAge: Date.now() + (21 * 24 * 60 * 60), // Set cookie to expire in 21 days
            });

            // call function to send verification email
            await sendVerificationEmail(user.email, user.verificationToken)
            if(user) {
                return res.status(200).json(user)
            }
            return res.status(400).json({msg: 'user could not be created'})
        } catch (err) {
            errorObject = handleErrors(err)
            return res.status(400).json(errorObject)
        }
    },

    verifyUser: async (req, res) => {
        const {token} = req.body

        try {
            
            if (!token) {
                
                return res.status(400).json({message: 'Failed, no token received'})
            }

            const user =  await User.findOne({verificationToken: token, verificationTokenExpiresIn: {$gt: Date.now()}})

            if (!user) {
                return res.status(400).json({mesage: 'Failed, token not found or has expired'})
            }

            user.isVerified = true
            user.verificationToken = undefined
            user.verificationTokenExpiresIn =  undefined

            await user.save()

            await sendWelcomeEmail(user.username, user.email)

            return res.status(200).json({message: 'Success', user: {
                ...user._doc, password: undefined
            }})

        } catch (err) {
            console.log(err.message)
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
            const user = await User.findOne({email})
            if(!user) {
                throw new Error('Incorrect email, email not found')
            }
            const auth = await bcrypt.compare(password, user.password)
            console.log(auth)
            if (auth) {
                console.log('user was logged in succesfully', user)
                const token = createToken(user._id)
                user.lastLogin = new Date()
                await user.save()
                res.cookie('token', token, {maxAge: Date.now() + (21 * 24 * 60 * 60)})
                return res.status(200).json({user: user._id})
            }
            throw new Error('incorrect password')
        } catch (err) {
            errorObject = handleErrors(err)
            console.log(err.message)
            return res.status(400).json(errorObject)
        }
    },

    logoutUser: async (req, res) => {
        try {
            res.cookie('token', '', {maxAge: 1})
            return res.status(200).json({message: 'logged out successfully'})
        } catch (error) {
            console.log(error)
        }
    },

    forgotPassword: async (req, res) => {
        const {email} = req.body
        try {
          const user = await User.findOne({email})  
          if (!user) {
            return res.status(400).json({message: 'User with the email not found'})
          }
        const resetToken = crypto.randomBytes(20).toString('hex')
        const resetTokenExpiresIn = Date.now() + (1 * 60 * 60)
        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpiresIn = resetTokenExpiresIn

        await user.save()

        //send reset password email
        await sendResetEmail(user.email, `${process.env.RESET_URL}/reset-password/${resetToken}`)

        return res.status(200).json({message: 'Reset email sent successfully'})

        } catch (error) {
            console.log(error.message)
            return res.status(400).json({message: 'Error sending reset email'})
        }
    },
    resetPassword: async (req, res) => {
        const {token} = req.params;
        const {password} = req.body

        try {
            const user = User.findOne({
                resetPasswordToken: token,
                resetPasswordTokenExpiresIn: {$gt: Date.now()}
            })

            if(!user) {
                return res.status(400).json({message: 'User not found, invalid or expired token'})
            }
            
            const hashedPassword = await bcrypt.hash(password, process.env.SECRET)
            user.password = hashedPassword;
            user.resetToken = undefined
            user.resetPasswordTokenExpiresIn = undefined

            await user.save()
            
        } catch (error) {
            
        }
    }
}
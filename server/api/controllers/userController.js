const { sendVerificationEmail, sendWelcomeEmail, sendResetEmail, sendResetEmailSuccess } = require('../../mailtrap/sendEmail')
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
        expiresIn: '14d'
    })
}

module.exports = {
    getUser: async (req, res) => {
        const id = req.params.id
        try {
        const user = await User.findById(id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
  }
    },

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
    const body = req.body;
    try {
    const user = await User.create(body);
    const jwtToken = createToken(user._id);
    console.log(`New user created at: ${user.formattedCreatedAt}`)
    

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 21 * 24 * 60 * 60 * 1000,
    });

    try {
      await sendVerificationEmail(user.email, user.verificationToken, user.username);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      try {
        await User.deleteOne({ _id: user._id });
      } catch (deleteError) {
        console.error('Failed to rollback user:', deleteError);
      }
      return res.status(500).json({ error: 'Failed to send verification email' });
    }

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      userId: user._id,
      createdAt: user.formattedCreatedAt
    });

  } catch (err) {
    const errorObject = handleErrors(err);
    return res.status(400).json(errorObject);
  }
},

checkAuthentication: async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
    const decoded = jwt.verify(token, process.env.SECRET);
    res.status(200).json({ authenticated: true, user: decoded });
  } catch (err) {
    res.status(401).json({ authenticated: false, message: 'Invalid token' });
  }
  } else {
    return res.status(401).json({ authenticated: false });
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

        return res.status(200).json({message: 'Success!! Email verification successful', user: {
            ...user._doc, password: undefined
        }})

    } catch (err) {
        return res.status(400).json({message: 'Error verifying'})
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
                // throw new Error('Incorrect email, email not found')
                return res.status(400).json({message: 'Incorrect email, email not found'})
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
      res.clearCookie('token');
      res.setHeader('Clear-Site-Data', '"cookies", "storage"');
      res.setHeader('Cache-Control', 'no-store');
      
      return res.status(200).json({ 
        message: 'Logged out successfully',
        redirect: '/login'
      });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({ message: 'Logout failed' });
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
        const resetTokenExpiresIn = Date.now() + (2 * 60 * 60 * 1000)
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
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordTokenExpiresIn: {$gt: Date.now()}
            })

            if(!user) {
                return res.status(400).json({message: 'Invalid token or token has expired'})
            }
            
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword;
            user.resetToken = undefined
            user.resetPasswordTokenExpiresIn = undefined

            await user.save()
            await sendResetEmailSuccess(user.email)
            return res.status(200).json({message: 'Password reset successful'})
            
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({message: 'Error resetting password'})
        }
    },

    checkAuth: async (req, res) => {
        try {
            const user = User.findById(req.userId)
            if (!user) {
                return res.status(400).json({message: 'User not found'})
            }
            return res.status(200).json({message: 'User authenticated successfully'})
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({message: 'Error authenticating user'})
        }
    }
}
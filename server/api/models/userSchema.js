const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: [true, 'Please input your name'], lowercase: true},
    username: { type: String, required: [true, 'Please input a username'], unique: true },
    state: {type: String, required: [true, 'Please input your state']},
    address: {type: String, required: [true, 'Please input your residential address']},
    email: { type: String, required: [true, 'Please input an email'], unique: true, lowercase: true, validate: [isEmail, 'Please enter a valid email'] },
    password: { type: String, required: [true, 'Password field cannot be empty'], minLength: [6, 'Password should be a minimum of 6 characters'] },
    googleID: {type: String},
}, {timestamps: true})

userSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour format
    });
  });

userSchema.pre('save', async function (next)  {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


//staic method for sign in
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email})
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('incorrect password')
    }
    throw new Error('Incorrect email, email not found')
}


userSchema.post('save', function (doc, next)  {
    console.log(`=============================== New User has been created============================================= /n`, doc);
    next()
})


const UserModel = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = UserModel;
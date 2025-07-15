const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const verificationTokenExpiryDate = () => (1 * 60 * 60 * 1000).toString();

// Updated formatDate function with validation
const formatDate = function (dateInput) {
  // Handle both Date objects and valid ISO strings
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  
  // Validate date before formatting
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateInput}`);
  }

  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  }).format(date);
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: [true, 'Please input your name'], lowercase: true },
  username: { type: String, required: [true, 'Please input a username'], unique: true },
  state: { type: String, required: [true, 'Please input your state'] },
  address: { type: String, required: [true, 'Please input your residential address'] },
  email: { type: String, required: [true, 'Please input an email'], unique: true, lowercase: true, validate: [isEmail, 'Please enter a valid email'] },
  password: { type: String, required: [true, 'Password field cannot be empty'], minLength: [6, 'Password should be a minimum of 6 characters'] },
  lastLogin: { type: Date, default: Date.now },
  googleID: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  resetPasswordToken: String,
  verificationTokenExpiresIn: String,
  resetPasswordTokenExpiresIn: String
}, { timestamps: true }, {virtuals: true}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Fixed virtual definition
userSchema.virtual('formattedCreatedAt').get(function() {
  return formatDate(this.createdAt);
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  
  if (this.isNew) {
    this.verificationToken = generateVerificationCode();
    this.verificationTokenExpiresIn = verificationTokenExpiryDate();
  }
  next();
});

// Updated post-save hook without mutating createdAt
userSchema.post('save', function (doc, next) {
  console.log(`=============================== New User Created =============================================`);
  console.log('User created at:', formatDate(doc.createdAt));
  next();
});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = UserModel;
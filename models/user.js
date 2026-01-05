const {Schema,model} = require('mongoose');
const {createHmac,randomBytes} = require('crypto');
const {createTokenUser} = require('../services/auth');


const userSchema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    salt: {type: String},
    password: {type: String, required: true},
    profileImageURL: {type: String, default: '/images/default.png'},
    role: {type: String, enum: ['user', 'admin'], default: 'user'}
    
}, { timestamps: true });

userSchema.pre('save', async function() {
    const user = this;

    if (!user.isModified('password')) {
        return;
    }

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
})

userSchema.statics.matchPasswordAndGenerateToken = async function(email, password) {
    const user = await this.findOne({ email }).exec();

    if (!user) {
        throw new Error('User not found');
    }

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedPassword = createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== userProvidedPassword) {
        throw new Error('Invalid password');
    }

    const token = createTokenUser(user)
    return token;
}


const User = model('user', userSchema);

module.exports = User;
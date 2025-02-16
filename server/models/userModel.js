import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

// Hash password before saving to database
UserSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// Find user by email, return null if email not existed
UserSchema.statics.findUserByEmail = async function(email){
    return await this.findOne({email});
}

// Find user by username, return null if username not existed
UserSchema.statics.findUserByUsername = async function (username) {
    return await this.findOne({username});
}

// Validate password
UserSchema.methods.comparePassword = function (input) {
    return bcrypt.compare(input, this.password)
}

const User = mongoose.model('User', UserSchema, 'users')
export default User;
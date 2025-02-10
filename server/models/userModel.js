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

// Validate password
UserSchema.methods.comparePassword = function (input) {
    return bcrypt.compare(input, this.password)
}

const User = mongoose.model('User', UserSchema, 'users')
export default User;
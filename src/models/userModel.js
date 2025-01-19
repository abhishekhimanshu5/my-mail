import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        validate: {
            validator: function (value) {
              return value.endsWith('@mymail.com'); // Ensure email ends with @mymail.com
            },
        message: 'Email must end with @mymail.com',
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        validate: {
            validator: function (value) {
              // Regex to check uppercase, lowercase, special character
              return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/.test(value);
            },
            message:
              'Password must include at least one uppercase letter, one lowercase letter, and one special character.',
        }
    },

    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    },
    lastLogin : {
        type : Date,
        default : Date.now
    },
    status: { 
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

})

const User = mongoose.model('User', UserSchema,'users');

export default User;
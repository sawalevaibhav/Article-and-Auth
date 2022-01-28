
const mongoose = require('mongoose')
const validator = require('validator')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
        maxlength: [30, "Name can not exceed 30 characters"],
        minlength: [4, "Name should have more than 4 characters"]
    },


    location: {

        country: { type: String },
        state: { type: String },
        city: {
            type: String
        }
    },

    speciality: {
        type: String,

    },

    email: {
        type: String,

        required: [true, 'Please Enter Your Email'],
        maxlength: [30, " Email can not exceed 30 characters"],
        minlength: [6, " Email should have more than 6 characters"],
        unique: true,
        validate: [validator.isEmail, "please enter your email"]

    },


    password: {
        type: String,

        required: [true, 'Please Enter Your password'],

        minlength: [4, " Email should have more than 4 characters"],
        select: false,

    },
   
    role: {
        type: String,
        default: "User"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,


})

// passsword hashing  

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 4)
})

// generate token

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECERT, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


//  compare password 

userSchema.methods.comparePassword =async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)

}

  

module.exports = mongoose.model("User", userSchema)
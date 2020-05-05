const mongoose = require("mongoose")

const {
    Schema
} = mongoose;
//or const Schema = mongoose.Schema

const AddressSchema = require("./addressSchema")

const jwt = require("jsonwebtoken")

const {
    encrypt,
    compare
} = require("../lib/encryption")

const env = require("../config/config")


//u take out the schema from mongoose with the new constructor and u store into this variable n which data
const UserSchema = new Schema({
    //check mongodb data types
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        //user can write in the login that their role is administrator or user
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

    password: {
        type: String,
        required: true
    },
    address: AddressSchema

}, {
    toObject: {
        virtuals: true
    }
    //, toJSON: {
    //     virtuals: true
    // }
})



UserSchema.virtual("fullName").get(function() {
    return `${this.firstName} ${this.lastName}`
})

UserSchema.methods.generateAuthToken = function() {

    const user = this;
    const token = jwt.sign({
        _id: user._id
    }, env.jwt_key).toString()

    user.tokens.push({ //pushing token into the database and see it as an object
        token
    })

    return token //with the return gives back a token to the user 

}

UserSchema.methods.getPublicFields = function() {
    let returnObject = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        _id: this._id
    }
    return returnObject
}


UserSchema.methods.checkPassword = async function(password) {
    const user = this;
    return await compare(password, user.password)

}

UserSchema.pre("save", async function(next) {
    //this is the pre function that will convert the password to hash

    if (!this.isModified("password")) return next()

    this.password = await encrypt(this.password)
    next()
})

UserSchema.statics.findByToken = function(token) {
    //here we're creating the method "findByToken"

    console.log("findByToken");
    const User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, env.jwt_key)
    } catch (e) {
        return;
    }
    return User.findOne({

        _id: decoded._id,

        // "tokens.token": token

    }).select("-password -__v")

}

module.exports = mongoose.model("User", UserSchema)
    //export data "userSchema "it's in the "user" collection
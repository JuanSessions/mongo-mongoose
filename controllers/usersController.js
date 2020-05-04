const createError = require("http-errors")
const db = require("../models/db")
const User = require("../models/userSchema")
const jwt = require("jsonwebtoken")



exports.getUsers = async(req, res, next) => {
    // let users = db.get("users").value()

    try {
        const users = await User.find()
        res.json({
            success: true,
            users: users
        })
    } catch (err) {
        next(err)
    }

}

exports.getUser = async(req, res, next) => {
    const {
        id
    } = req.params

    try {
        const user = await User.findById(id)
        if (!user) throw createError(404)
        res.json({
            success: true,
            user: user
        })
    } catch (err) {
        next(err)
    }

}

exports.postUser = async(req, res, next) => {
    console.log(req.body)

    try {
        const user = new User(req.body)
        const token = user.generateAuthToken()
        await user.save()

        const data = user.getPublicFields()

        res.header("x-auth", token).json({
            success: true,
            user: user
        })
    } catch (err) {
        next(err)
    }
}


exports.putUser = async(req, res, next) => {
    const {
        id
    } = req.params
    const user = req.body

    try {
        const user = await User.findByIdAndUpdate(id, user, {
            new: true
        })
        if (!updateUser) throw createError(500)
        res.json({
            success: true,
            user: updateUser
        })
    } catch (err) {
        next(err)
    }
}


exports.deleteUser = async(req, res, next) => {

    const {
        id
    } = req.params

    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) throw createError(404)
        res.json({
            success: true,
            user: user
        })
    } catch (err) {
        next(err)
    }

}

exports.login = async(req, res, next) => {

    const {
        email,
        password
    } = req.body
    try {

        const user = await User.findOne({
            email
        })
        console.log("test1")
        const valid = await user.checkPassword(password)
        console.log("tset2")
        if (!valid) throw createError(403)

        let token = user.generateAuthToken()
        const data = user.getPublicFields()


        res.header("x-auth", token).json({
            success: true,
            user: data
        })
    } catch (err) {
        next(err)
    }

}
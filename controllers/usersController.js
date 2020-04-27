const createError = require("http-errors")
const db = require("../models/db")
const User = require("../models/userSchema")
    //const uuid = require("uuid-random")

exports.getUsers = async(req, res, next) => {
    // let users = db.get("users").value()

    try {
        const users = await User.find()
        res.header("Access-control-Allow-Origin", "*")
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
        await user.save()
        res.json({
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
    user.id = uuid()
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
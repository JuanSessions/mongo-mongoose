exports.log = (req, res, next) => {
    console.log(req.method)
    console.log("this is a middleware function")
    next()
}
const {
    body,
    validationResult
} = require("express-validator")

exports.validateInputs = () => {
    return [
        body("email").isEmail().normalizeEmail().withMessage("invalid email"),
        body("password").isLength({
            min: 5
        }).withMessage("password is too short"),

        body("firstName").notEmpty().exists().trim().escape().withMessage("Please give us your first name"),

        (req, res, next) => {
            let errors = validationResult(req)
            if (!errors.isEmpty()) {
                console.log(errors)
                let err = errors.errors.map(er => ({
                    [er.param]: er.msg
                }))
                return res.json({
                    status: 203,
                    message: err
                })
            }
            next()
        }

        // in the post Route u are checking w the conditions in the middleware here as an Array before POST
        //validations is always happening in the Back-End 
    ]
}
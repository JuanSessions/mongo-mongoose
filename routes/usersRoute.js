const Route = require("express").Router()
const {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
} = require("../controllers/usersController")
const {
    validateInputs
} = require("../middleware/validator")

const {
    body
} = require("express-validator")

Route.get("/", getUsers)
Route.get("/:id", getUser)
Route.post("/", validateInputs(), postUser)



/* Route.route("/")
.get(getUsers)
.post(postUser) */

Route.put("/:id", putUser)

Route.delete("/:id", deleteUser)



module.exports = Route
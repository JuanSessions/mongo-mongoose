const Route = require("express").Router()
const {getUsers,getUser, postUser, putUser,deleteUser}  = require("../controllers/usersController")

Route.get("/",getUsers)
Route.get("/:id", getUser)
Route.post("/",postUser)

/* Route.route("/")
.get(getUsers)
.post(postUser) */

Route.put("/:id",putUser)

Route.delete("/:id",deleteUser )



module.exports= Route
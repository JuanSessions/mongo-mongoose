const Route = require("express").Router()
const {
    getRecords,
    getRecord,
    postRecord,
    putRecord,
    deleteRecord
} = require("../controllers/recordsController")

const auth = require("../middleware/authenticator")
const isAdmin = require("../middleware/rolesAuthenticator")

Route.get("/", auth, getRecords) //auth checks that the user has a token and then continue w the request
Route.get("/:id", auth, getRecord)
Route.post("/", auth, isAdmin, postRecord)

/* Route.route("/")
.get(getRecords)
.post(postRecord) */
//this is the client with the request sending to the server and with middleware as a door keeper 
//to check that the conditions for the request to have a response are correct




Route.put("/:id", auth, isAdmin, putRecord)

Route.delete("/:id", auth, isAdmin, deleteRecord)



module.exports = Route
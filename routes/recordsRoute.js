const Route = require("express").Router()
const {
    getRecords,
    getRecord,
    postRecord,
    putRecord,
    deleteRecord
} = require("../controllers/recordsController")
const {
    log
} = require("../middleware/log")


Route.get("/", getRecords)
Route.get("/:id", getRecord)
Route.post("/", postRecord)
    /* Route.route("/")
    .get(getRecords)
    .post(postRecord) */
    //this is the client with the request sending to the server and with middleware as a door keeper 
    //to check that the conditions for the request to have a response are correct




Route.put("/:id", putRecord)

Route.delete("/:id", deleteRecord)



module.exports = Route
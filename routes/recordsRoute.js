const Route = require("express").Router()
const {getRecords,getRecord, postRecord, putRecord,deleteRecord}  = require("../controllers/recordsController")

Route.get("/",getRecords)
Route.get("/:id", getRecord)
Route.post("/",postRecord)

/* Route.route("/")
.get(getRecords)
.post(postRecord) */

Route.put("/:id",putRecord)

Route.delete("/:id",deleteRecord )



module.exports= Route
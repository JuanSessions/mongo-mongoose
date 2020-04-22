const Route = require("express").Router()
const {getOrders,getOrder, postOrder, putOrder,deleteOrder}  = require("../controllers/ordersController")

Route.get("/",getOrders)
Route.get("/:id", getOrder)
Route.post("/",postOrder)

/* Route.route("/")
.get(getOrders)
.post(postOrder) */

Route.put("/:id",putOrder)

Route.delete("/:id",deleteOrder )



module.exports= Route
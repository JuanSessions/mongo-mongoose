const Route = require("express").Router()

const {
    getOrders,
    getOrder,
    postOrder,
    putOrder,
    deleteOrder
} = require("../controllers/ordersController")

const auth = require("../middleware/authenticator")
const isAdmin = require("../middleware/rolesAuthenticator")


Route.get("/", auth, isAdmin, getOrders)
    //auth checking before get, post, etc as middleware checking that there is a token
    // and also let only admin to check all orders
Route.get("/:id", auth, getOrder)
Route.post("/", auth, postOrder)

/* Route.route("/")
.get(getOrders)
.post(postOrder) */

Route.put("/:id", auth, putOrder)

Route.delete("/:id", auth, deleteOrder)



module.exports = Route
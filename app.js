const express = require("express")
const app = express()
const createError = require("http-errors")
const mongoose = require("mongoose")
const logger = require("morgan")

const indexRoute = require("./routes/indexRoute")
const recordsRoute = require("./routes/recordsRoute")
const usersRoute = require("./routes/usersRoute")
const ordersRoute = require("./routes/ordersRoute")
const {
    log
} = require("./middleware/log")

const port = process.env.PORT || 3001;

mongoose.connect("mongodb://127.0.0.1:27017/record-shop-mongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.connection.on("error", (err) => console.log(err))
mongoose.connection.on("open", () => console.log("database connected"))


app.use(express.json())
    //this is the middleware, getting data from the controller
app.use(logger("dev"))


app.use("/", indexRoute)

app.use("/records", recordsRoute)
app.use("/orders", ordersRoute)
app.use("/users", usersRoute)



//errors handler
app.use((req, res, next) => {
    next(createError(404))
})

//error catcher
app.use((err, req, res, next) => {
    res.json({
        status: err.status,
        err: err.message
    })
})





app.listen(port, () => console.log("server is running"))
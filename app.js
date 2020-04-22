const express= require("express")
const app = express()
const createError = require("http-errors")

const indexRoute = require("./routes/indexRoute")
const recordsRoute =require("./routes/recordsRoute")
const usersRoute = require("./routes/usersRoute")
const ordersRoute = require("./routes/ordersRoute")

const port = process.env.PORT ||  3000; 


app.use(express.json())


app.use("/", indexRoute)

app.use("/records", recordsRoute)
app.use("/orders", ordersRoute)
app.use("/users",usersRoute)



//errors handler
app.use((req,res,next)=>{
  next(createError(404))
})

//error catcher
  app.use((err,req,res,next)=>{
    res.json({ status: err.status, err:err.message})
})  





app.listen(port, ()=>console.log("server is running"))


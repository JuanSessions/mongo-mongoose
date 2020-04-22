const createError= require("http-errors")
const db= require("../models/db")


exports.getOrders= (req,res,next)=>{
    let orders = db.get("orders").value()
    res.json({success:true, orders: orders})
}

exports.getOrder=(req,res,next)=>{
   const {id} = req.params 
    let order= db.get("orders").find({id}).value()
    res.json({success:true, order:order})
}

exports.postOrder=(req,res,next)=>{
    console.log("order.............",req.body)

    db.get("orders")
    .push(req.body)
    .last()
    .assign({id:new Date().toString()})
    .write()

    
    res.json({success:true,order:req.body })
}

exports.putOrder=(req,res,next)=>{
    const {id} = req.params
    const order= req.body
    order.id = new Date().toString()
    db.get("orders").find({id}).assign(order).write()

    res.json({success:true, order:order})

}
exports.deleteOrder=(req,res,next)=>{
    console.log(req.params.id)
    if(req.params.id!=="1"){
       next(createError(500))
    }
    const {id} =req.params
   let order =  db.get("orders").remove({id}).write()
    res.json({success:true,order:order})
}
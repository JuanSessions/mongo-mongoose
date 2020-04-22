const createError= require("http-errors")
const db= require("../models/db")


exports.getUsers= (req,res,next)=>{
    let users = db.get("users").value()
    res.json({success:true, users: users})
}

exports.getUser=(req,res,next)=>{
   const {id} = req.params 
    let user= db.get("users").find({id}).value()
    res.json({success:true, user:user})
}

exports.postUser=(req,res,next)=>{
    console.log(req.body)

    db.get("users")
    .push(req.body)
    .last()
    .assign({id:new Date().toString()})
    .write()

    
    res.json({success:true,user:req.body })
}

exports.putUser=(req,res,next)=>{
    const {id} = req.params
    const user= req.body
    user.id = new Date().toString()
    db.get("users").find({id}).assign(user).write()

    res.json({success:true, user:user})

}
exports.deleteUser=(req,res,next)=>{
    console.log(req.params.id)
    if(req.params.id!=="1"){
       next(createError(500))
    }
    const {id} =req.params
   let user =  db.get("users").remove({id}).write()
    res.json({success:true,user:user})
}
const createError= require("http-errors")
const db= require("../models/db")


exports.getRecords= (req,res,next)=>{
    let records = db.get("records").value()
    res.json({success:true, records: records})
}

exports.getRecord=(req,res,next)=>{
   const {id} = req.params 
    let record= db.get("records").find({id}).value()
    res.json({success:true, record:record})
}

exports.postRecord=(req,res,next)=>{
    console.log(req.body)

    db.get("records")
    .push(req.body)
    .last()
    .assign({id:new Date().toString()})
    .write()

    
    res.json({success:true,record:req.body })
}

exports.putRecord=(req,res,next)=>{
    const {id} = req.params
    const record= req.body
    record.id = new Date().toString()
    db.get("records").find({id}).assign(record).write()

    res.json({success:true, record:record})

}
exports.deleteRecord=(req,res,next)=>{
    console.log(req.params.id)
    if(req.params.id!=="1"){
       next(createError(500))
    }
    const {id} =req.params
   let record =  db.get("records").remove({id}).write()
    res.json({success:true,record:record})
}
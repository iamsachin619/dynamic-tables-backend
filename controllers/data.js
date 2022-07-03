const Row = require('../models/row')
const User = require('../models/user')
const {createError} = require('../util/createError')

const updateArray = async (req,res,next)=>{
   try{
       const {row_id, arrData} = req.body;
       const row = await Row.findByIdAndUpdate(row_id, {$set:{data: arrData}}, {new: true})
       res.status(200).json(row)  
   }catch(err){
    next(err)
   }
}

const addRow = async (req,res,next) =>{
    try{
        const {rowName, length, _id} = req.body
        const newArray = new Array(length);
        newArray.fill('')
        const row = new Row({rowName: rowName, data: newArray})
        const addedRow = await row.save()

        const user = await User.findByIdAndUpdate(_id, {$push: {rows: addedRow._doc._id}}, {new: true})
        console.log(user)
        res.status(200).json(addedRow)
    }catch(err){
        next(err)
    }
}

const addColumn = async (req,res,next) => {
    try{
        const {_id, columnName} = req.body
        const user = await User.findByIdAndUpdate(_id,{$push: {columnData: columnName}}, {new: true})
        
        //adding blank in all rows of user
        user._doc.rows.forEach(async (id) => {
        const row = await Row.findByIdAndUpdate(id, {$push:{data: ''}})
        
        })
        res.status(200).send('ok')
    }catch(err){
        next(err)
    }
}

const getDataOfRows = async (req,res,next) => {
    try{
        const { row_ids} = req.body
        let data = []
        await Promise.all( row_ids.map(async (id)=>{
            const row = await Row.findById(id)
            data.push(row)
            console.log(row)
        }))
        res.status(200).json(data)

    }catch(err){
        next(err)
    }
}

const getRow = async (req,res,next) => {
    try{
        const {row_id} = req.body
        const row = await Row.findById(row_id)
        if(!row){
           return next(createError(404,'no row fount'))
        }
        res.status(200).json(row)

    }catch(err){
        next(err)
    }
}


module.exports = {updateArray, addRow, addColumn, getDataOfRows, getRow}
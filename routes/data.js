const express = require('express')
const {verifyToken} = require('../util/verify')
const {updateArray,  addRow, addColumn, getDataOfRows, getRow} = require('../controllers/data')
const route = express.Router()

route.post('/test',verifyToken,()=>{
    console.log('here')
})

route.post('/update',verifyToken, updateArray)
route.post('/addRow',verifyToken, addRow)
route.post('/addColumn',verifyToken, addColumn)
route.post('/getDataOfRows',verifyToken, getDataOfRows)
route.post('/getRow',verifyToken, getRow)

module.exports = route
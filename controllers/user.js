const User = require('../models/user')
const Row = require('../models/row')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken');
const {createError} = require('../util/createError')

const signUp = async (req,res,next) => {

    try {
        const user = req.body;
        
        const row = new Row({rowName: 'Name',data:['Test Sachin']})
        const testRow = await row.save()
        console.log(testRow._doc._id)
        const newUser = new User({...user, password: CryptoJS.SHA256(user.password), rows:[testRow._doc._id],columnData:['Column1']});
        const addedUser = await newUser.save();
        const {password, _id,...otherData} = addedUser._doc 
        res.status(200).json(otherData)
    }catch(err) {
        next(err);
    }
}


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) return next(createError(404, "User not found"));
       
        const encrypt = CryptoJS.SHA256(password)
       
        if (encrypt.toString() !== user.password) return next(createError(401, "Wrong password"));
        const token = jwt.sign({ id: user._id, type:'User' }, process.env.JWT_SECRET);
        delete user._doc.password
       
        res.status(200).cookie('access_token', token, { httpOnly: true }).json(user);
    } catch (err) {
        next(err);
    }
}
module.exports = {
    signUp,
    login
}
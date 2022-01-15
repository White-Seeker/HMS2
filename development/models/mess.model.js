const mongoose = require('mongoose')

const notice=new mongoose.Schema({
    monday: {type: String, required: true},
    tuesday: {type: String, required: true},
    wednesday: {type: String, required: true},
    thursday: {type: String, required: true},
    friday: {type: String, required: true},
    saturday: {type: String, rerquired: true},
    sunday: {type: String, required: true}
},
    {collection: 'mess-details'}
)

const model=mongoose.model('mess',notice)

module.exports=model
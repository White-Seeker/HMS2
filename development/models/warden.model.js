const mongoose = require('mongoose')

const notice=new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, rerquired: true}
},
    {collection: 'warden-details'}
)

const model=mongoose.model('warden',notice)

module.exports=model
const mongoose = require('mongoose')

const notice=new mongoose.Schema({
    name: {type: String, required: true},
    id: {type: String, required: true},
    phone: {type: String, required: true}
},
    {collection: 'staff-details'}
)

const model=mongoose.model('staff',notice)

module.exports=model
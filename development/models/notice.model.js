const mongoose = require('mongoose')

const notice=new mongoose.Schema({
    name: {type: String, required: true},
    notice: {type: String, required: true},
    noticetitle: {type: String, required: true},
    nid: {type: Number, required: true}
},
    {collection: 'notice-board'}
)

const model=mongoose.model('notice',notice)

module.exports=model
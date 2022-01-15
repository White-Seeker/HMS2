const mongoose = require('mongoose')

const notice=new mongoose.Schema({
    id: {type: String, required: true},
    amount: {type: Number, required: true},
    details: {type: String, required: true}
},
    {collection: 'payment-details'}
)

const model=mongoose.model('payment',notice)

module.exports=model
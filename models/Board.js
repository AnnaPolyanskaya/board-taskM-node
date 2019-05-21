const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: ""
    },
    user:{
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('boards', BoardSchema)
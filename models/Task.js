const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TaskSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: ""
    },
    board: {
        ref: 'boards',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    doneStatus: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('tasks', TaskSchema)
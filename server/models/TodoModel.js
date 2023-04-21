const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false,
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Todo', todoSchema)
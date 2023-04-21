const { models } = require('mongoose')
const TodoModel = require('../models/TodoModel')

module.exports.getTodo = async (req, res) => {
    const todo = await TodoModel.find( { isCompleted: false })
    res.send(todo)
}
module.exports.getCompletedTodos = async (req, res) => {
    const ctodo = await TodoModel.find( { isCompleted: true })
    res.send(ctodo)
}
module.exports.saveTodo = async (req, res) => {
    const {text} = req.body 
    TodoModel
    .create({text})
    .then((data) => {
        console.log("Added Successfully!!!");
        console.log(data);
        res.send(data)
    })
}

module.exports.updateTodo = async (req, res) => {
    const { _id, text} = req.body
    TodoModel
    .findByIdAndUpdate(_id, {text})
    .then(() => res.send("Updated!!"))
    .catch((err) => console.log(err))
}
module.exports.markCompleted = async (req, res) => {
    const { _id, isCompleted} = req.body
    TodoModel
    .findByIdAndUpdate(_id, {isCompleted})
    .then(() => res.send("Updated!!"))
    .catch((err) => console.log(err))
}
module.exports.deleteTodo = async (req, res) => {
    const { _id} = req.body
    TodoModel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted!!"))
    .catch((err) => console.log(err))
}
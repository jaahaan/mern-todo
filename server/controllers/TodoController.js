const { models } = require("mongoose");
const TodoModel = require("../models/TodoModel");

/** get auth user upcomming todo */
module.exports.getTodo = async (req, res) => {
  const user_id = req.user;
  const todo = await TodoModel.find({
    isCompleted: false,
    user_id: user_id,
  }).sort({ updatedAt: -1 });

  res.send(todo);
};

/** get auth user completed todo */
module.exports.getCompletedTodos = async (req, res) => {
  const user_id = req.user;
  const ctodo = await TodoModel.find({ isCompleted: true, user_id: user_id });
  res.send(ctodo);
};

/** create new todo */
module.exports.saveTodo = async (req, res) => {
  const { text } = req.body;
  try {
    const user_id = req.user;
    const todo = await TodoModel.create({ text, user_id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** update todo */
module.exports.updateTodo = async (req, res) => {
  const { _id, text } = req.body;
  TodoModel.findByIdAndUpdate(_id, { text })
    .then(() => res.send("Updated!!"))
    .catch((err) => console.log(err));
};

/** mark todo as completed */
module.exports.markCompleted = async (req, res) => {
  const { _id, isCompleted } = req.body;
  TodoModel.findByIdAndUpdate(_id, { isCompleted })
    .then(() => res.send("Updated!!"))
    .catch((err) => console.log(err));
};

/** delete todo */
module.exports.deleteTodo = async (req, res) => {
  const { _id } = req.body;
  TodoModel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted!!"))
    .catch((err) => console.log(err));
};

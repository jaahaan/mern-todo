const express = require('express');
const router = express.Router();

const {getTodo, saveTodo, updateTodo, deleteTodo, getCompletedTodos, markCompleted} = require('../controllers/TodoController')
const auth = require('../middlewares/auth')

router.use(auth)

router.get('/', getTodo)
router.get('/completed_todos', getCompletedTodos)

router.post('/', saveTodo)
router.post('/mark_completed', markCompleted)
router.post('/update', updateTodo)
router.post('/delete', deleteTodo)


// router.delete('/:id', deleteTodo)
// router.patch('/:id', updateTodo)

module.exports = router
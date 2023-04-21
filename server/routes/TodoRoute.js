const {Router} = require('express')
const {getTodo, saveTodo, updateTodo, deleteTodo, getCompletedTodos, markCompleted} = require('../controllers/TodoController')
const router = Router()

router.get('/', getTodo)
router.get('/completed_todos', getCompletedTodos)
router.post('/mark_completed', markCompleted)
router.post('/save', saveTodo)
router.post('/update', updateTodo)
router.post('/delete', deleteTodo)


module.exports = router

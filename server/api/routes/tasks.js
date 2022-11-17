const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/tasks');

router.get('/', TasksController.fetchAllTasks);

/* router.post('/', TodosController.todos_create_todo);

router.get('/:todoId', TodosController.todos_get_todo);

router.patch('/:todoId', TodosController.todos_update_todo);

router.delete('/:todoId', TodosController.todos_delete_todo); */

module.exports = router;

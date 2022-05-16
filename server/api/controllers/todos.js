const mongoose = require('mongoose');
const Todo = require('../models/todo');

exports.todos_get_all = (req, res, next) => {
    console.log("Get all the Todos");
    Todo.find()
        .select()
        .exec()
        .then(docs => {
            const result = {
                count: docs.length,
                todos: docs.map(doc => {
                    var requestedUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
                    return {
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                        status: doc.status,
                        priority: doc.priority,
                        reporter: doc.reporter,
                        assignee: doc.assignee,
                        isFavorite: doc.isFavorite,
                        request: {
                            type: 'GET',
                            url: `${requestedUrl}/${doc._id}`
                        }
                    }
                })
            }
            
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

    /* res.status(200).json({
        tasks: [
            {
                type: "Todo",
                todos: [
                    {
                        id: 1,
                        title: "todo task1",
                        description: "some description related to todo task1 goes here",
                        assignee: "ADivya",
                        reporter: "R_ADivya",
                        status: "Todo",
                        priority: "Cosmetic"
                    },
                    {
                        id: 2,
                        title: "todo task2",
                        description: "some description related to todo task2 goes here",
                        assignee: "BDivya",
                        reporter: "R_BDivya",
                        status: "Todo",
                        priority: "Cosmetic"
                    }
                ]
            },
            {
                type: "In Progress",
                todos: [
                    {
                        id: 3,
                        title: "todo task3",
                        description: "some description related to todo task3 goes here",
                        assignee: "CDivya",
                        reporter: "R_CDivya",
                        status: "InProgress",
                        priority: "Minor"
                    },
                    {
                        id: 4,
                        title: "todo task4",
                        description: "some description related to todo task4 goes here",
                        assignee: "DDivya",
                        reporter: "R_DDivya",
                        status: "InProgress",
                        priority: "Moderate"
                    }
                ]
            },
            {
                type: "Done",
                todos: [
                    {
                        id: 5,
                        title: "todo task5",
                        description: "some description related to todo task5 goes here",
                        assignee: "EDivya",
                        reporter: "R_EDivya",
                        status: "Done",
                        priority: "Major"
                    },
                    {
                        id: 6,
                        title: "todo task6",
                        description: "some description related to todo task6 goes here",
                        assignee: "FDivya",
                        reporter: "R_FDivya",
                        status: "Done",
                        priority: "Critical"
                    }
                ]
            }
        ]
    }); */
    /* (req, res) => {
        console.log("requesting todos");
        res.json({"message": "Hello"});
    } */
}; 

exports.todos_create_todo = (req, res, next) => {
    console.log(req.body);
    const todo = new Todo({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        assignee: req.body.assignee,
        reporter: req.body.reporter,
        status: req.body.status,
        priority: req.body.priority,
        isFavorite: req.body.isFavorite
    });
    todo.save()
        .then(result => {
            console.log(result);
            var requestedUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            res.status(201).json({
                message: 'New todo is created successfully',
                createdTodo: {
                    _id: result._id,
                    title: result.title,
                    description: result.description,
                    assignee: result.assignee,
                    reporter: result.reporter,
                    status: result.status,
                    priority: result.priority,
                    isFavorite: result.isFavorite,
                    request: {
                        type: 'POST',
                        url: `${requestedUrl}/${result._id}`
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};

exports.todos_get_todo = (req, res, next) => {
    res.status(200).json({
        message: 'Get particular todo'
    });
};

exports.todos_update_todo = (req, res, next) => {
    res.status(200).json({
        message: 'update particular todo'
    });
};

exports.todos_delete_todo = (req, res, next) => {
    res.status(200).json({
        message: 'Delete particular todo'
    });
};

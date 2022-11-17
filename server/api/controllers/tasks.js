const Task = require('../models/task');

exports.fetchAllTasks = (req, res, next) => {
    console.log("Get all the Tasks");
    Task.find()
        .select()
        .exec()
        .then(tasks => {
            console.log('tasks', tasks);
            res.status(200).json(tasks);
        })
        .catch(err => {
            console.log("Error======");
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


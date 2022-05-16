const tasksData = {
    tasks: [
        {
            type: "Todo",
            todos: [
                {
                    title: "todo task1",
                    description: "some description related to todo task1 goes here",
                    assignee: "ADivya",
                    reporter: "R_ADivya",
                    status: "Not Started",
                    priority: "Cosmetic"
                },
                {
                    title: "todo task2",
                    description: "some description related to todo task2 goes here",
                    assignee: "BDivya",
                    reporter: "R_BDivya",
                    status: "Not Started",
                    priority: "Cosmetic"
                }
            ]
        },
        {
            type: "In Progress",
            todos: [
                {
                    title: "todo task3",
                    description: "some description related to todo task3 goes here",
                    assignee: "CDivya",
                    reporter: "R_CDivya",
                    status: "In Progress",
                    priority: "Minor"
                },
                {
                    title: "todo task4",
                    description: "some description related to todo task4 goes here",
                    assignee: "DDivya",
                    reporter: "R_DDivya",
                    status: "In Progress",
                    priority: "Moderate"
                }
            ]
        },
        {
            type: "Done",
            todos: [
                {
                    title: "todo task5",
                    description: "some description related to todo task5 goes here",
                    assignee: "EDivya",
                    reporter: "R_EDivya",
                    status: "Done",
                    priority: "Major"
                },
                {
                    title: "todo task6",
                    description: "some description related to todo task6 goes here",
                    assignee: "FDivya",
                    reporter: "R_FDivya",
                    status: "Done",
                    priority: "Critical"
                }
            ]
        },
        {
            type: "detailed view title goes here",
            todo: {
                title: "todo task5",
                description: "some description related to todo task5 goes here",
                assignee: "EDivya",
                reporter: "R_EDivya",
                status: "Done",
                priority: "Major"
            }
        }
    ]
};

export default tasksData;

import { useState, useEffect } from 'react';
import Column from '../components/ui/Column';
import classes from './AllTodosPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTodos } from '../slices/todoSlice';
//import data from '../store/data';

const AllTodosPage = () => {
    const dispatch = useDispatch()

    const storeState = useSelector(state => {
        return state.todo.value;
    });
    console.log(storeState);

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);
    useEffect(() => {
        dispatch(getAllTodos())
            .unwrap()
            .then((originalPromiseResult) => {                
                // handle result here
                console.log(originalPromiseResult);
                setTasks(originalPromiseResult);
                setIsLoading(false);
            })
            .catch((rejectedValueOrSerializedError) => {
                // handle error here
                console.log(rejectedValueOrSerializedError);
            })
        /* fetch("/todos")
            .then(response => {
                return response.json();
            })
            .then(data => {
                const tasks = [];
                let todoObj = {};
                let inProgressObj = {};
                let doneObj = {};
                const todoTasks = [];
                const inProgressTasks = [];
                const doneTasks = [];
                data.todos.map(task => {
                    var taskStatus = task.status;
                    if(task.status === 'Todo') {
                        todoTasks.push(task);
                        return todoObj = {
                            'type': taskStatus,
                            'todos': todoTasks
                        }
                    } else if(task.status === 'InProgress') {
                        inProgressTasks.push(task);
                        return inProgressObj = {
                            'type': taskStatus,
                            'todos': inProgressTasks
                        }
                    } else {
                        doneTasks.push(task);
                        return doneObj = {
                            'type': taskStatus,
                            'todos': doneTasks
                        }
                    }                    
                });
                tasks.push(todoObj, inProgressObj, doneObj);
                setTasks(tasks);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            }); */
    },[]);

    if(isLoading) {
        return <p>Loading...</p>
    }
    return (        
        <main className={`${classes.main} ${classes.threecolumnLayout}`}>
            {
                tasks.map((task, index) => {
                    return (
                        <Column key={index} data={task}/>
                    )
                })
            }
        </main>
    )
};

export default AllTodosPage;

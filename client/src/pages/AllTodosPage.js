import { useState, useEffect } from 'react';
import Column from '../components/ui/Column';
import classes from './AllTodosPage.module.css';
//import data from '../store/data';

const AllTodosPage = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);
    useEffect(() => {
        fetch("/todos")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTasks(data.tasks);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
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

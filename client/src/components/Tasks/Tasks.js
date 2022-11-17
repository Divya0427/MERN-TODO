import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Task from './Task';

const Tasks = ({tasks}) => {
    const dispatch = useDispatch();

    const storeState = useSelector(state => {
        return state;
    });
    
    return (        
        <>
            {tasks.map(task => {
                return <Task task={task}></Task>
            })}
        </>
    )
};

export default Tasks;

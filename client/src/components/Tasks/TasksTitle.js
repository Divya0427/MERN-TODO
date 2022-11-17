import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TasksTitle = ({title}) => {
    const dispatch = useDispatch()

    const storeState = useSelector(state => {
        return state;
    });
    
    return (        
        <div className='task-category'>{title}</div>
    )
};

export default TasksTitle;

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../../slices/tasksSlice';
import TasksTitle from './TasksTitle';
import Tasks from './Tasks';
import './tasks.css';

const TasksContainer = () => {
    const dispatch = useDispatch();

    const storeState = useSelector(state => {
        return state.tasks.tasks;
    });
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch]);
    
    return (
        <div className='tasks-container'>
            <div className='tasks'>
                {
                    storeState.map(data => {
                        return <div className='tasks-column'>
                            <TasksTitle key={data._id} title={data.category}></TasksTitle>
                            <Tasks tasks={data.tasks}></Tasks>
                        </div>
                    })
                }
            </div>
        </div>        
    )
};

export default TasksContainer;

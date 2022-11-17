import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Task = ({task}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const storeState = useSelector(state => {
        return state;
    });
    const showTaskDetails = () => {
        setShowModal(true);
    };
    return (
        <>
            <div className='task-tile' onClick={showTaskDetails}>
                <div>{task.taskTitle}</div>
                <div>{task.status}</div>
                <div>{task.description}</div>
            </div>
            {showModal && }
        </>
    )
};

export default Task;

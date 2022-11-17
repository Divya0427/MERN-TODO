import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        tasks: tasksReducer
    }
})
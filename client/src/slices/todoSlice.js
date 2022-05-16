import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    value: 17
}

//Create the thunk
export const getAllTodos = createAsyncThunk(
    'todo/getAllTodos',
    async (thunkAPI) => {
        const response = await fetch("/todos")
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
                return tasks;
            })
            .catch(err => {
                console.log(err);
                return thunkAPI.RejectWithValue(err);
            });
        console.log(response);
        return response;
    }
)

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        editTodo: (state, action) => {

        },
        deleteTodo: (state, action) => {

        }
    },
    extraReducers: {
        [getAllTodos.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllTodos.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.newVal = action.payload;
            console.log(action.payload);
        },
        [getAllTodos.rejected]: (state, action) => {
            state.isLoading = false;
        }
    }
});

// Action creators are generated for each case reducer function
export const { editTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
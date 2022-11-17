import { applyMiddleware, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = { 
    loading: true,
    error: null,
    tasks: [],
    todo: [],
    inDev: [],
    inReview: [],
    inQe: [],
    testComplete: [],
    taskDetails: {}
}

/* export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (_, { rejectWithValue }) => {
        const response = await api.fetchTasks();
        return response.data;
    
        return rejectWithValue(err.response.data);
    
  ); */
export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (thunkAPI) => {
        console.log('Fetch taska');
        return await fetch("/tasks")
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
                return thunkAPI.RejectWithValue(err);
            });
    }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
  extraReducers: {
    [fetchTasks.pending]: (state, action) => {
        console.log('Loading...');
        state.isLoading = true;
    },
    [fetchTasks.fulfilled]: (state, action) => {
        state.isLoading = false;
        // state.newVal = action.payload;
        console.log(action.payload);
        state.tasks = action.payload;
    },
    [fetchTasks.rejected]: (state, action) => {
        state.isLoading = false;
    }
}
})

export const { increment, decrement, incrementByAmount } = tasksSlice.actions;
export default tasksSlice.reducer;
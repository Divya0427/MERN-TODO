import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Layout/Navigation';
import AllTodosPage from './pages/AllTodosPage';
import NewTodoPage from './pages/NewTodoPage';
import FavoriteTodosPage from './pages/FavoriteTodosPage';
import TasksContainer from './components/Tasks/TasksContainer';
import PageNotFound from './pages/PageNotFound';


function App() {
  return (
    <div className="App">
        <Navigation />
        <Routes>
            <Route path='/' element={ <AllTodosPage /> }></Route>
            <Route path='/new-todo' element={ <NewTodoPage /> }></Route>
            <Route path='/favorites' element={ <FavoriteTodosPage /> }></Route>
            <Route path='/tasks' element={ <TasksContainer /> }></Route>
            <Route path='*' element={ <PageNotFound /> }></Route>
        </Routes>
    </div>
  );
}

export default App;

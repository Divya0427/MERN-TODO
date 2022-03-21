import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';

const Navigation = () => {
    return (
        <header className={ classes.header }>
            <h1 className={ classes.logo }>Todos</h1>
            <nav className={classes.navbar}>
                <ul className={classes.mainNav}>
                    <li>
                        <Link to='/'>All Todos</Link>
                    </li>
                    <li>
                        <Link to='/new-todo'>Add New Todo</Link>
                    </li>
                    <li>
                        <Link to='/favorites'>
                            My Favorites
                            <span className={ classes.badge }></span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default Navigation;

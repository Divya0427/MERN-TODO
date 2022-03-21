import Card from './Card';

const Column = (props) => {
    console.log(props);

    return (
        <div>
            <article>
                <h2>{props.data.type}</h2>
                {                       
                    props.data.todos.map(todo => {
                        return <Card onClick={props.onClick} key={todo.id} data={todo}/>
                    })                    
                }                
            </article>
        </div>
    )
}
export default Column;

import Card from './Card';

const Column = (props) => {
    console.log(props);
    const handleEdit = (e) => {
        console.log("Editing");
        const selectedId = e.currentTarget.getAttribute('data-id');
        fetch('')
            .then( data => {
                console.log(data);
            })
            .catch(err => {
                console.log('Can\'t get the selected todo details');
            })
    }
    const handleDelete = (e) => {
        console.log('Deleting');
    }
    return (
        <div>
            <article>
                <h2>{props.data.type}</h2>
                {                       
                    props.data.todos.map((todo, index) => {
                        return <Card onClick={props.onClick} key={todo._id} data={todo} deleteHandler={handleDelete} editHandler={handleEdit}/>
                    })                    
                }                
            </article>
        </div>
    )
}
export default Column;

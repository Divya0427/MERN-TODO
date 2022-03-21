import classes from './Card.module.css';

const Card = (props) => {
    console.log(props);
    const dragStartHandler = (e) => {
        console.log("Drag start");
        /* let img = new Image();
        img.src = '../../../cursor.png';
        e.dataTransfer.setDragImage(img, 10, 10); */
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", e.target.innerText);
        e.dataTransfer.setData("text/html", e.target.outerHTML);
        e.dataTransfer.setData("text/uri-list", e.target.ownerDocument.location.href);
    }

    return (
        <div draggable="true" onClick={props.onClick} onDragStart={dragStartHandler} className={classes.cardContainer}>
            <h3 className={classes.todoTitle}>{props.data.title}</h3>
            <div className={classes.todoDetails}>
                <div>Priority: {props.data.priority}</div>
                <div>Assignee: {props.data.assignee}</div>
                <div>Reporter: {props.data.reporter}</div>
            </div>
            <div className={classes.buttonsContainer}>
                <button className={classes.editButton}>
                    <i className="glyphicon glyphicon-pencil"></i>
                    Edit
                </button>
                <button className={classes.deleteButton}>
                    <i className="glyphicon glyphicon-trash"></i>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Card;

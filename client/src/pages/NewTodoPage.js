import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classes from './NewTodoPage.module.css';


/* 
    S.No            
    Title           Text field
    Description     Textarea
    Responsible     Text field
    Priority        Dropdown(High, Low, Medium)
    Status          Dropdown(Completed, Pending, Blocked)
    IsFavorite      Star icon
    Edit
    Delete
    SortBy
    Filter    
*/

const NewTodoPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        fetch('/todos', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => {
            navigate('/', { replace: true});
        })
        .catch(err => {
            console.log('Cant submit the form');
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <label htmlFor="title">Title*</label>
                <span>
                    <input
                    id="title"
                    placeholder="Title"
                    aria-invalid={errors.title ? "true" : "false"}
                    {...register('title', { required: true, maxLength: 50 })}
                    />

                    {errors.title && errors.title.type === "required" && (
                    <span className={classes.error} role="alert">Title is required</span>
                    )}
                    {errors.title && errors.title.type === "maxLength" && (
                    <span className={classes.error} role="alert">Max length exceeded</span>
                    )}
                </span>
                
                <label htmlFor="description">Description*</label>
                <span>
                    <textarea
                    id="description"
                    placeholder="Description"
                    aria-invalid={errors.description ? "true" : "false"}
                    {...register('description', { required: true, maxLength: 100 })}
                    />
                    
                    {errors.description && errors.description.type === "required" && (
                    <span className={classes.error} role="alert">Description is required</span>
                    )}
                    {errors.description && errors.description.type === "maxLength" && (
                    <span className={classes.error} role="alert">Max length exceeded</span>
                    )}
                </span>
                
                <label htmlFor="status">Status*</label>
                <span>
                    <select name="status" {...register("status", {
                        required: "Please select Status"
                        })}
                    >
                        <option value="">Select Status</option>
                        <option value="Todo">Todo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                    </select>

                    {errors.status && (
                        <span className={classes.error}> {errors.status.message}</span>
                    )}
                </span>
                
                <label htmlFor="priority">Priority*</label>
                <span>
                    <select name="priority" {...register("priority", {
                        required: "Please select Priority"
                        })}
                    >
                        <option value="">Select Priority</option>
                        <option value="Cosmetic">Cosmetic</option>
                        <option value="Minor">Minor</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Major">Major</option>
                        <option value="Critical">Critical</option>
                    </select>

                    {errors.priority && (
                        <span className={classes.error}> {errors.priority.message}</span>
                    )}
                </span>

                <label htmlFor="reporter">Reporter*</label>
                <span>
                    <input
                    id="reporter"
                    value="Divya"
                    placeholder="Reporter"
                    aria-invalid={errors.reporter ? "true" : "false"}
                    {...register('reporter', { required: true, maxLength: 50 })}
                    />

                    {errors.reporter && errors.reporter.type === "required" && (
                    <span className={classes.error} role="alert">Reporter is required</span>
                    )}
                    {errors.reporter && errors.reporter.type === "maxLength" && (
                    <span className={classes.error} role="alert">Max length exceeded</span>
                    )}
                </span>


                <label htmlFor="assignee">Assignee*</label>
                <span>
                    <input
                    id="assignee"
                    value="Divya"
                    placeholder="Assignee"
                    aria-invalid={errors.assignee ? "true" : "false"}
                    {...register('assignee', { required: true, maxLength: 50 })}
                    />

                    {errors.assignee && errors.assignee.type === "required" && (
                    <span className={classes.error} role="alert">Assignee is required</span>
                    )}
                    {errors.assignee && errors.assignee.type === "maxLength" && (
                    <span className={classes.error} role="alert">Max length exceeded</span>
                    )}
                </span>
                
                <label htmlFor="isFavorite">Is Favorite?</label>
                <span>
                    <input
                    id="isFavorite"                    
                    type="checkbox"                    
                    {...register('isFavorite')}
                    />                    
                </span>

                <input type="submit" />
            </form>            
        </div>
    )
};

export default NewTodoPage;

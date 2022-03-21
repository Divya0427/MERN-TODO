import { useForm } from 'react-hook-form';
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
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <label htmlFor="title">Title</label>

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

                <label htmlFor="description">Description</label>

                <input
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
                
                <label htmlFor="status">Status</label>
                <select name="status" {...register("status", {
                    required: "select Status"
                    })}
                >
                    <option value="">Select...</option>
                    <option value="A">status A</option>
                    <option value="B">status B</option>
                </select>

                {errors.status && (
                    <p className={classes.error}> {errors.status.message}</p>
                )}
                
                <label htmlFor="priority">Priority</label>
                <select name="priority" {...register("priority", {
                    required: "select Priority"
                    })}
                >
                    <option value="">Select...</option>
                    <option value="A">priority A</option>
                    <option value="B">priority B</option>
                </select>

                {errors.priority && (
                    <p className={classes.error}> {errors.priority.message}</p>
                )}
                <input type="submit" />
            </form>            
        </div>
    )
};

export default NewTodoPage;

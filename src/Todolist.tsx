import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType, TaskType } from "./App" // Import types for props and task-related values
import { Button } from "./Button"

// Define the type for component props
type PropsType = {
    title: string   // Title of the todolist
    todolistId: string   // Unique ID of the todolist
    tasks: TaskType[]   // List of tasks for the todolist
    removeTask: (taskIdToRemove: string, todolistId: string) => void   // Function to remove a task
    changeFilter: (filter: FilterValuesType, todolistId: string) => void   // Function to change the current filter
    addTask: (taskTitle: string, todolistId: string) => void   // Function to add a new task
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void   // Function to update task status
    filter: FilterValuesType   // Current filter value
    removeTodolist: (todolistId: string) => void   // Function to remove the entire todolist
}

// Functional component for a Todolist
export const Todolist = ({
                             title, // Title of the todolist
                             todolistId, // ID of the todolist
                             tasks, // Array of tasks in this todolist
                             removeTask, // Function to remove a task
                             changeFilter, // Function to update filter
                             addTask, // Function to add a new task
                             changeTaskStatus, // Function to update task status
                             filter, // Current filter applied to tasks
                             removeTodolist // Function to remove the todolist
                         }: PropsType) => {
    const [taskTitle, setTaskTitle] = useState<string>("") // State for the new task input
    const [error, setError] = useState<string | null>(null) // State for error messages related to task input

    // Handler to add a new task
    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            addTask(taskTitle.trim(), todolistId) // Add task if input is valid
            setTaskTitle("") // Clear the input field
        } else {
            setError("Title is required") // Show error if input is empty
        }
    }

    // Handler to track changes in the task input field
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value) // Update taskTitle state as the user types
    }

    // Handler to remove the todolist
    const removeTodolistHandler = () => {
        removeTodolist(todolistId) // Call the function to remove the todolist
    }

    // Handler to add a task when the Enter key is pressed
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null) // Clear any previous error messages
        if (event.key === "Enter") {
            addTaskHandler() // Add the task
        }
    }

    // Handler to change the current filter for the todolist
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId) // Update the filter for the todolist
    }

    // Handler to update the status (checked/unchecked) of a task
    const changeTaskStatusHandler = (task: TaskType) => (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked // Get the new checkbox value
        changeTaskStatus(task.id, newStatusValue, todolistId) // Update the task's status
    }

    // Render the todolist component
    return (
        <div>
            {/* Header with title and remove button */}
            <div className={"todolist-title-container"}>
                <h3>{title}</h3> {/* Display the todolist title */}
                <Button title={"x"} onClick={removeTodolistHandler} /> {/* Button to remove the todolist */}
            </div>

            {/* Input field and add button */}
            <div>
                <input
                    value={taskTitle} // Bind input value to state
                    onChange={changeTaskTitleHandler} // Update state on input change
                    onKeyUp={addTaskOnKeyUpHandler} // Handle "Enter" key
                    className={error ? "error" : ""} // Add error styling if there's an error
                />
                <Button title={"+"} onClick={addTaskHandler} /> {/* Button to add a new task */}

                {/* Show error message if input is invalid */}
                {error && <div className={"error-message"}>{error}</div>}
            </div>

            {/* Display tasks or show "No tasks" if empty */}
            {tasks.length === 0 ? (
                <p>No tasks..</p> // Message if there are no tasks
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className={task.isDone ? "is-done" : ""}> {/* Style completed tasks */}
                            <input
                                type="checkbox"
                                checked={task.isDone} // Checkbox reflects task status
                                onChange={changeTaskStatusHandler(task)} // Update task status on change
                            />
                            <span>{task.title}</span> {/* Display task title */}
                            <Button title={"x"} onClick={() => removeTask(task.id, todolistId)} /> {/* Button to remove task */}
                        </li>
                    ))}
                </ul>
            )}

            {/* Filter buttons */}
            <div>
                <Button
                    className={filter === "all" ? "active-filter" : ""} // Highlight active filter
                    title={"All"}
                    onClick={() => changeFilterTasksHandler("all")} // Show all tasks
                />
                <Button
                    className={filter === "active" ? "active-filter" : ""} // Highlight active filter
                    title={"Active"}
                    onClick={() => changeFilterTasksHandler("active")} // Show active (not done) tasks
                />
                <Button
                    className={filter === "completed" ? "active-filter" : ""} // Highlight active filter
                    title={"Completed"}
                    onClick={() => changeFilterTasksHandler("completed")} // Show completed tasks
                />
            </div>
        </div>
    )
}

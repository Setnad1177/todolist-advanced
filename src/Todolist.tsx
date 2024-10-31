import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
    title: string; // Title of the todolist
    todolistId: string; // Unique ID of the todolist
    tasks: TaskType[]; // List of tasks for the todolist
    removeTask: (taskIdToRemove: string, todolistId: string) => void; // Function to remove a task
    changeFilter: (filter: FilterValuesType, todolistId: string) => void; // Function to change the current filter
    addTask: (taskTitle: string, todolistId: string) => void; // Function to add a new task
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void; // Function to update task status
    filter: FilterValuesType; // Current filter value
};

export const Todolist = ({
                             title,
                             todolistId,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                         }: PropsType) => {
    // State to manage the value of the input where the task title is typed
    const [taskTitle, setTaskTitle] = useState<string>("");

    // State to manage error messages when trying to add an invalid task
    const [error, setError] = useState<string | null>(null);

    // Function to handle adding a task
    const addTaskHandler = () => {
        // If the input is not empty, trim extra spaces and add the task
        if (taskTitle.trim() !== "") {
            addTask(taskTitle.trim(), todolistId);
            setTaskTitle(""); // Clear the input field
        } else {
            // Show an error message if the input is empty
            setError("Title is required");
        }
    };

    // Function to handle changes in the input field
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    };

    // Function to handle adding a task by pressing the "Enter" key
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null); // Clear any previous error
        if (event.key === "Enter") {
            addTaskHandler();
        }
    };

    // Function to handle changing the current filter
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId);
    };

    // Function to handle changes in task status (e.g., checkbox toggle)
    const changeTaskStatusHandler = (task: TaskType) => (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newStatusValue, todolistId);
    };

    return (
        <div>
            {/* Display the title of the todolist */}
            <h3>{title}</h3>

            <div>
                {/* Input field for entering task title */}
                <input
                    value={taskTitle} // Controlled input: value is tied to state
                    onChange={changeTaskTitleHandler} // Update task title state on change
                    onKeyUp={addTaskOnKeyUpHandler} // Add task when "Enter" key is pressed
                    className={error ? "error" : ""} // Add "error" class if there is an error
                />

                {/* Button to add a new task */}
                <Button title={"+"} onClick={addTaskHandler}/>

                {/* Display error message if input validation fails */}
                {error && <div className={"error-message"}>{error}</div>}
            </div>

            {/* Display tasks if available; otherwise show "No tasks" message */}
            {tasks.length === 0 ? (
                <p>No tasks..</p> // Message when no tasks are available
            ) : (
                <ul>
                    {/* Loop through each task and render it */}
                    {tasks.map((task) => (
                        <li
                            key={task.id} // Unique key for each task
                            className={task.isDone ? "is-done" : ""} // Apply "is-done" class if task is completed
                        >
                            {/* Checkbox to toggle task status */}
                            <input
                                type="checkbox"
                                checked={task.isDone} // Checked state is tied to task's isDone property
                                onChange={changeTaskStatusHandler(task)} // Update task status when toggled
                            />

                            {/* Display the task title */}
                            <span>{task.title}</span>

                            {/* Button to remove the task */}
                            <Button title={"x"} onClick={() => removeTask(task.id, todolistId)}/>
                        </li>
                    ))}
                </ul>
            )}

            <div>
                {/* Buttons for filtering tasks */}
                <Button
                    className={filter === "all" ? "active-filter" : ""} // Highlight button if "all" filter is active
                    title={"All"} // Button label
                    onClick={() => changeFilterTasksHandler("all")} // Apply "all" filter on click
                />
                <Button
                    className={filter === "active" ? "active-filter" : ""} // Highlight button if "active" filter is active
                    title={"Active"} // Button label
                    onClick={() => changeFilterTasksHandler("active")} // Apply "active" filter on click
                />
                <Button
                    className={filter === "completed" ? "active-filter" : ""} // Highlight button if "completed" filter is active
                    title={"Completed"} // Button label
                    onClick={() => changeFilterTasksHandler("completed")} // Apply "completed" filter on click
                />
            </div>
        </div>
    );
};

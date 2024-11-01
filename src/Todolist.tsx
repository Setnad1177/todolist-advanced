import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {FilterValuesType, TaskType} from "./App"
import {Button} from "./Button"

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

export const Todolist = ({
                             title,
                             todolistId,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             removeTodolist
                         }: PropsType) => {
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            addTask(taskTitle.trim(), todolistId)
            setTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }

    const changeTaskStatusHandler = (task: TaskType) => (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task.id, newStatusValue, todolistId)
    }

    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3>{title}</h3>
                <Button title={"x"} onClick={removeTodolistHandler}/>
            </div>

            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                    className={error ? "error" : ""}
                />
                <Button title={"+"} onClick={addTaskHandler}/>

                {error && <div className={"error-message"}>{error}</div>}
            </div>

            {tasks.length === 0 ? (
                <p>No tasks..</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeTaskStatusHandler(task)}
                            />
                            <span>{task.title}</span>
                            <Button title={"x"} onClick={() => removeTask(task.id, todolistId)}/>
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <Button
                    className={filter === "all" ? "active-filter" : ""}
                    title={"All"}
                    onClick={() => changeFilterTasksHandler("all")}
                />
                <Button
                    className={filter === "active" ? "active-filter" : ""}
                    title={"Active"}
                    onClick={() => changeFilterTasksHandler("active")}
                />
                <Button
                    className={filter === "completed" ? "active-filter" : ""}
                    title={"Completed"}
                    onClick={() => changeFilterTasksHandler("completed")}
                />
            </div>
        </div>
    )
}  

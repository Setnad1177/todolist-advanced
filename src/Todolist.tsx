import React, {KeyboardEvent, ChangeEvent, useState} from "react"
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskIdToRemove: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter}: PropsType) => {

    //useState for task title(name) input
    const [taskTitle, setTaskTitle] = useState<string>("")

    //useState for error message while adding new Task
    const [error, setError] = useState<string | null>(null)

    //addTask Handler
    const addTaskHandler = () => {
        // restrict empty task adding
        if (taskTitle.trim() !== "") {
            // delete spaces at the beginning and the end of the task name
            addTask(taskTitle.trim())

            setTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    //changeTaskTitle Handler
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    //addTaskOnKeyUp Handler
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    //changeFilterTasks Handler
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }

    //changeTaskStatus Handler
    //Task checkbox change. If Task is done or not (task status)
    const changeTaskStatusHandler = (task: TaskType) => (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task.id, newStatusValue)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                {/*Task Input with "add task (+) button"*/}
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    //add task on Enter key press
                    onKeyUp={addTaskOnKeyUpHandler}
                    //error on wrong Task name
                    className={error ? 'error' : ''}
                />

                <Button title={"+"} onClick={addTaskHandler}/>
                {/*error message for wrong Task name*/}
                {error && <div className={'error-message'}>{error}</div>}
            </div>

            {/*No tasks / Or show Tasks list (with .map)*/}
            {tasks.length === 0 ? (
                <p>No tasks..</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            // If Task is done then add "is-done" class to it (to highlight the Task on the list)
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>

                                {/*Tasks checkboxes*/}
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler(task)}
                                />
                                <span>{task.title}</span>
                                {/* "x" Button to delete a task*/}
                                <Button title={"x"} onClick={() => removeTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>)}

            <div>
                {/*task filter buttons*/}
                <div>
                    <Button
                        className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}
                    />
                    <Button
                        className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}
                    />
                    <Button
                        className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}
                    />
                </div>
            </div>
        </div>
    )
}
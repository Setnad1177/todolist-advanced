import React from "react"
import { TaskType, FilterValuesType } from "./App"
import { AddItemForm } from './AddItemForm'
import { Button } from './Button'

type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskIdToRemove: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
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
    const addTaskCallback = (title: string) => {
        addTask(title, todolistId)
    }

    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3>{title}</h3>
                <Button title={"x"} onClick={() => removeTodolist(todolistId)} />
            </div>

            <AddItemForm addItem={addTaskCallback} /> {/* Используем AddItemForm для добавления задач */}

            {tasks.length === 0 ? (
                <p>No tasks..</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)}
                            />
                            <span>{task.title}</span>
                            <Button title={"x"} onClick={() => removeTask(task.id, todolistId)} />
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <Button
                    className={filter === "all" ? "active-filter" : ""}
                    title="All"
                    onClick={() => changeFilter("all", todolistId)}
                />
                <Button
                    className={filter === "active" ? "active-filter" : ""}
                    title="Active"
                    onClick={() => changeFilter("active", todolistId)}
                />
                <Button
                    className={filter === "completed" ? "active-filter" : ""}
                    title="Completed"
                    onClick={() => changeFilter("completed", todolistId)}
                />
            </div>
        </div>
    )
}

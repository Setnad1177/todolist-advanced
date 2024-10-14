import React from "react"
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskIdToRemove: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask:() => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {


    return (
        <div>
            <h3>{title}</h3>
            <div>
                {/*Input with "add task (+) button"*/}
                <input/>
                <Button onClick={addTask} title={"+"}/>
            </div>

            {tasks.length === 0 ? (
                <p>No tasks..</p>
            ) : (
                <ul>

                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                {/* "x" Button component to delete a task*/}
                                <Button title={"x"} onClick={() => removeTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>)}

            <div>
                {/*task filter buttons*/}
                <Button title={"All"} onClick={() => changeFilter("all")}/>
                <Button title={"Active"} onClick={() => changeFilter("active")}/>
                <Button title={"Completed"} onClick={() => changeFilter("completed")}/>
            </div>
        </div>
    )
}
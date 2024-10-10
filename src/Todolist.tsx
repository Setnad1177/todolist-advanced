import React from "react"
import {TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskIdToRemove: number) => void
}

export const Todolist = ({title, tasks, removeTask}: PropsType) => {


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"}/>
            </div>

            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
            <ul>

                {tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={      () => removeTask(task.id)     }>x</button>
                        </li>
                    )
                })}
            </ul>)}

            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}
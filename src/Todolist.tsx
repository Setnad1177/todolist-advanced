import React from "react"
import {TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
    title: string
    subTitle?: string
    description?: string
    tasks: TaskType[]
    date?: string
}

export const Todolist = ({title, tasks, date}: PropsType) => {


    return (
        <div>

            <h3>{title}</h3>
            {/*<h4>{subTitle}</h4>*/}
            {/*<p>{description}</p>*/}
            {/*<div>{tasks.map(t => t.title)}</div>*/}

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
                            <input type="checkbox" checked={task.isDone} /><span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>)}

            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <div>{date}</div>
        </div>
    )
}
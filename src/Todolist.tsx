import React from "react"
import {TaskType} from "./App";

type PropsType = {
    title: string
    subTitle?: string
    description?: string
    tasks: TaskType[]
}

export const Todolist = ({title, tasks}: PropsType) => {


    return (
        <div>

            <h3>{title}</h3>
            {/*<h4>{subTitle}</h4>*/}
            {/*<p>{description}</p>*/}

            <div>{tasks.map(t => t.title)}</div>

            <div>
                <input/>
                <button>+</button>
            </div>

            <ul>
                <li>
                    <input type="checkbox" checked={true}/> <span>HTML&CSS</span>
                </li>
                <li>
                    <input type="checkbox" checked={true}/> <span>JS</span>
                </li>
                <li>
                    <input type="checkbox" checked={false}/> <span>React</span>
                </li>
            </ul>

            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>

        </div>
    )
}
import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist"

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "Typescript", isDone: false},
        {id: 6, title: "RTK query", isDone: false},
    ])

    const removeTask = (taskIdToRemove: number) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskIdToRemove
        })
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

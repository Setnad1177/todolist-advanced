import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist"

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "Typescript", isDone: false},
        {id: 6, title: "RTK query", isDone: false},
    ])
    //useState to remove and update (show up to date) list of tasks
    const removeTask = (taskIdToRemove: number) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskIdToRemove
        })
        setTasks(filteredTasks)
    }
    //useState to filter tasks by all/active/completed/
    const [filter, setFilter] = useState<FilterValuesType>('all')

    // changing filter state with button click(all/active/completed)
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

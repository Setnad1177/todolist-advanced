import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist"
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Typescript", isDone: false},
        {id: v1(), title: "RTK query", isDone: false},
    ])

    //task adding
    const addTask = (taskTitle: string) => {
        const newTask = {
            id: v1(),
            title: taskTitle,
            isDone: false,
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    //useState to remove and update (show up to date) list of tasks
    const removeTask = (taskIdToRemove: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskIdToRemove
        })
        setTasks(filteredTasks)
    }

    //useState declaration to filter tasks by all/active/completed/
    const [filter, setFilter] = useState<FilterValuesType>("all")

    // changing filter state with button click (filter types: all/active/completed)
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForTodolist = tasks

    if (filter === "active") {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

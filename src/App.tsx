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

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function App() {

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: v1(), title: "What to learn", filter: "all"},
        {id: v1(), title: "What to buy", filter: "all"},
    ])

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

    //Checkbox of Task change (change Task status)
    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        const newState = tasks.map(t => (t.id == taskId ? {...t, isDone: taskStatus} : t))
        setTasks(newState)
    }


    let tasksForTodolist = tasks

    if (filter === "active") {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }


    //return

    return (
        <div className="App">
            {todolists.map(tl => {
                return (
                    <Todolist
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                    />
                )
            })}
        </div>
    )
        ;
}

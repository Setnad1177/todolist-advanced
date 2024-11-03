import React, {useState} from "react"
import "./App.css"
import {Todolist} from "./Todolist"
import {v1} from "uuid"

// Type definitions for Task and Filter
export type TaskType = {
    id: string  // Unique ID of the task
    title: string  // Name/title of the task
    isDone: boolean  // Task completion status
}

// Type for tasks state
export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed"  // Possible filter values

type TodolistType = {
    id: string  // Unique ID of the todolist
    title: string  // Title of the todolist
    filter: FilterValuesType  // Current filter applied to the todolist
}

export function App() {
    // Generate unique IDs for two example todolists
    let todolistID1 = v1()
    let todolistID2 = v1()

    // State to manage an array of todolists
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    // State to manage tasks
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: false}
        ]
    })

    // Function to add a new task to a specific todolist
    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }

        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    // Function to remove a task from a specific todolist
    const removeTask = (taskId: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        const newTodolistTasks = todolistTasks.filter((t) => t.id !== taskId)
        //delete tasks from todolist state
        tasks[todolistId] = newTodolistTasks
        //set copy of an object to state
        setTasks({...tasks})
    }

    // Function to change the filter of a specific todolist
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map((tl) =>
            tl.id === todolistId ? {...tl, filter} : tl
        )
        setTodolists(newTodolists)
    }

    // Function to change the status of a specific task
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        const newTodolistTasks = todolistTasks.map((t) =>
            t.id === taskId ? {...t, isDone: taskStatus} : t
        )
        tasks[todolistId] = newTodolistTasks
        setTasks({...tasks})
    }

    // Function to remove a todolist
    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter((tl) => tl.id !== todolistId)
        setTodolists(newTodolists)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map((tl) => {
                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
                }

                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    )
}

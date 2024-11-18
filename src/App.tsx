import React, {useState} from "react"
import "./App.css"
import {Todolist} from "./Todolist"
import {v1} from "uuid"
import {AddItemForm} from "./AddItemForm"
//Material UI imports for App Bar start
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
//Material UI imports for App Bar end

// Type definitions for Task and Filter
export type TaskType = {
    id: string  // Unique ID of the task
    title: string  // Name/title of the task
    isDone: boolean  // Task completion status
}

// Type for tasks state, mapping a todolist ID to an array of tasks
export type TasksStateType = {
    [key: string]: TaskType[]  // Tasks state: maps a todolist ID to an array of tasks
}

export type FilterValuesType = "all" | "active" | "completed"  // Possible filter values for tasks

type TodolistType = {
    id: string  // Unique ID of the todolist
    title: string  // Title of the todolist
    filter: FilterValuesType  // Current filter applied to the todolist
}

// Main App component
export function App() {
    let todolistID1 = v1()  // ID for "What to learn"
    let todolistID2 = v1()  // ID for "What to buy"

    // State to manage an array of todolists
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: "What to learn", filter: "all"}, // Example todolist 1
        {id: todolistID2, title: "What to buy", filter: "all"}, // Example todolist 2
    ])

    // State to manage tasks, grouped by their corresponding todolist ID
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
    })

    // Function to add a new task to a specific todolist
    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(), // Generate a new unique ID for the task
            title: title, // Use the provided title
            isDone: false, // New tasks are initially not done
        }

        // Add the new task to the beginning of the corresponding todolist's task array
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})  // Update the state with a new object
    }

    // Function to remove a task from a specific todolist
    const removeTask = (taskId: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId]  // Get tasks for the specified todolist
        const newTodolistTasks = todolistTasks.filter((t) => t.id !== taskId)  // Remove the task by ID
        tasks[todolistId] = newTodolistTasks  // Update the tasks state for the todolist
        setTasks({...tasks})  // Update state with a new object to trigger a re-render
    }

    // Function to change the filter of a specific todolist
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map((tl) =>
            tl.id === todolistId ? {...tl, filter} : tl // Update the filter for the matching todolist
        )
        setTodolists(newTodolists)  // Update the todolists state
    }

    // Function to change the status (done/undone) of a specific task
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const todolistTasks = tasks[todolistId]  // Get tasks for the specified todolist
        const newTodolistTasks = todolistTasks.map((t) =>
            t.id === taskId ? {...t, isDone: taskStatus} : t // Update the isDone status for the matching task
        )
        tasks[todolistId] = newTodolistTasks  // Update the tasks state for the todolist
        setTasks({...tasks})  // Update state with a new object to trigger a re-render
    }

    // Function to remove a todolist and its associated tasks
    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter((tl) => tl.id !== todolistId)  // Remove the todolist by ID
        setTodolists(newTodolists)  // Update the todolists state

        // Delete tasks associated with the removed todolist
        delete tasks[todolistId]
        setTasks({...tasks})  // Update state with a new object
    }

    // Function to add a new todolist
    const addTodolist = (title: string) => {
        const todolistId = v1()  // Generate a new ID for the new todolist
        const newTodolist: TodolistType = {id: todolistId, title: title, filter: "all"}

        setTodolists([newTodolist, ...todolists])  // Add the new todolist to the state
        setTasks({...tasks, [todolistId]: []})  // Add an empty array for tasks for the new todolist
    }

    // Callback for task title update
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const newTodolistTasks = {
            ...tasks, // Spread the existing tasks state
            [todolistId]: tasks[todolistId].map((t) =>
                t.id === taskId ? {...t, title} : t // Update the title for the matching task
            ),
        }
        setTasks(newTodolistTasks)  // Update state with the new tasks object
    }

    // Callback for todolist title update

    const updateTodolist = (todolistId: string, title: string) => {
        const newTodolists = todolists.map(tl => (tl.id === todolistId ? {...tl, title} : tl))
        setTodolists(newTodolists)
    }

    // Render the application
    return (
        <div>
            {/*App Bar MUI*/}
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            {/* Use AddItemForm to add a new todolist */}
            <AddItemForm addItem={addTodolist}/>

            {/* Render the list of todolists */}
            {todolists.map((tl) => {
                const allTodolistTasks = tasks[tl.id]  // Get tasks for the current todolist
                let tasksForTodolist = allTodolistTasks

                // Filter tasks based on the current filter value
                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)  // Show only active tasks
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)  // Show only completed tasks
                }

                return (
                    <Todolist
                        key={tl.id} // Use the todolist ID as a unique key
                        todolistId={tl.id} // Pass todolist ID to the Todolist component
                        title={tl.title} // Pass the title of the todolist
                        tasks={tasksForTodolist} // Pass the filtered tasks
                        removeTask={removeTask} // Pass the function to remove a task
                        changeFilter={changeFilter} // Pass the function to change the filter
                        addTask={addTask} // Pass the function to add a task
                        changeTaskStatus={changeTaskStatus} // Pass the function to change task status
                        filter={tl.filter} // Pass the current filter value
                        removeTodolist={removeTodolist} // Pass the function to remove the todolist
                        updateTask={updateTask} // Pass the function to update a task title
                        updateTodolist={updateTodolist}
                    />
                )
            })}
        </div>
    )
}

import {useReducer, useState} from "react"
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
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import {MenuButton} from "./MenuButton"
import {createTheme, ThemeProvider} from "@mui/material/styles"
import Switch from "@mui/material/Switch"
import CssBaseline from "@mui/material/CssBaseline"
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./model/tasks-reducer";

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

export type TodolistType = {
    id: string  // Unique ID of the todolist
    title: string  // Title of the todolist
    filter: FilterValuesType  // Current filter applied to the todolist
}

type ThemeMode = "dark" | "light"

// Main App component
export function AppWithReducers() {
//theme start
    const [themeMode, setThemeMode] = useState<ThemeMode>("light")

    const theme = createTheme({
        palette: {
            mode: themeMode === "light" ? "light" : "dark",
            primary: {
                main: "#087EA4",
            },
        },
    })

    const changeModeHandler = () => {
        setThemeMode(themeMode == "light" ? "dark" : "light")
    }
    // theme end

    let todolistID1 = v1()  // ID for "What to learn"
    let todolistID2 = v1()  // ID for "What to buy"

    // State to manage an array of todolists
    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: "What to learn", filter: "all"}, // Example todolist 1
        {id: todolistID2, title: "What to buy", filter: "all"}, // Example todolist 2
    ])

    // State to manage tasks, grouped by their corresponding todolist ID
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(addTaskAC({title, todolistId}))  // Update the state with a new object
    }

    // Function to remove a task from a specific todolist
    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC({taskId, todolistId}))  // Update state with a new object to trigger a re-render
    }

    // Function to change the filter of a specific todolist
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))  // Update the todolists state
    }

    // Function to change the status (done/undone) of a specific task
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) =>
        dispatchToTasks(changeTaskStatusAC({taskId, todolistId, isDone}))  // Update state with a new object to trigger a re-render


// Function to remove a todolist and its associated tasks
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)  // Update the todolists state
        dispatchToTasks(action)  // Update state with a new object
    }

// Function to add a new todolist
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

// Callback for task title update
    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC({todolistId, taskId, title}))  // Update state with the new tasks object
    }

// Callback for todolist title update

    const updateTodolist = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
    }


// Render the application
return (
    <div>
        {/*App Bar MUI*/}
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static" sx={{mb: "30px"}}>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={"default"} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container sx={{mb: "30px"}}>

                    {/* Use AddItemForm to add a new todolist */}
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>

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
                            <Grid>
                                <Paper sx={{p: "0 20px 20px 20px"}}>
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
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    </div>
)
}

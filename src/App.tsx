import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

// Type definitions for Task and Filter
export type TaskType = {
    id: string; // Unique ID of the task
    title: string; // Name/title of the task
    isDone: boolean; // Task completion status
};

export type FilterValuesType = "all" | "active" | "completed"; // Possible filter values

type TodolistType = {
    id: string; // Unique ID of the todolist
    title: string; // Title of the todolist
    filter: FilterValuesType; // Current filter applied to the todolist
};

export function App() {
    // Generate unique IDs for two example todolists
    let todolistID1 = v1();
    let todolistID2 = v1();

    // State to manage an array of todolists
    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID1, title: "What to learn", filter: "all" },
        { id: todolistID2, title: "What to buy", filter: "all" },
    ]);

    // State to manage tasks. Tasks are stored in an object where each key is a todolist ID
    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "Rest API", isDone: true },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
    });

    // Function to add a new task to a specific todolist
    const addTask = (title: string, todolistId: string) => {
        // Create a new task object
        const newTask = {
            id: v1(),
            title: title,
            isDone: false, // Default status is "not done"
        };

        // Get the current tasks for the todolist
        const todolistTasks = tasks[todolistId];

        // Add the new task to the start of the array
        tasks[todolistId] = [newTask, ...todolistTasks];

        // Update the state to trigger a re-render
        setTasks({ ...tasks });
    };

    // Function to remove a task from a specific todolist
    const removeTask = (taskId: string, todolistId: string) => {
        // Get the current tasks for the todolist
        const todolistTasks = tasks[todolistId];

        // Filter out the task with the matching ID
        const newTodolistTasks = todolistTasks.filter((t) => t.id !== taskId);

        // Update the tasks for this todolist
        tasks[todolistId] = newTodolistTasks;

        // Update the state to trigger a re-render
        setTasks({ ...tasks });
    };

    // Function to change the filter of a specific todolist (e.g., show all, active, or completed tasks)
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        // Map through the todolists and update the filter for the matching todolist
        const newTodolists = todolists.map((tl) =>
            tl.id === todolistId ? { ...tl, filter } : tl
        );

        // Update the state to trigger a re-render
        setTodolists(newTodolists);
    };

    // Function to change the status (done or not done) of a specific task
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        // Get the current tasks for the todolist
        const todolistTasks = tasks[todolistId];

        // Update the status of the task with the matching ID
        const newTodolistTasks = todolistTasks.map((t) =>
            t.id === taskId ? { ...t, isDone: taskStatus } : t
        );

        // Update the tasks for this todolist
        tasks[todolistId] = newTodolistTasks;

        // Update the state to trigger a re-render
        setTasks({ ...tasks });
    };

    // Render the application
    return (
        <div className="App">
            {/* Map through all todolists and render them */}
            {todolists.map((tl) => {
                // Get the tasks for the current todolist
                const allTodolistTasks = tasks[tl.id];
                let tasksForTodolist = allTodolistTasks;

                // Apply the current filter to the tasks
                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
                }

                // Render the Todolist component
                return (
                    <Todolist
                        key={tl.id} // Unique key for each todolist
                        todolistId={tl.id} // Pass the todolist ID as a prop
                        title={tl.title} // Pass the todolist title as a prop
                        tasks={tasksForTodolist} // Pass the filtered tasks as a prop
                        removeTask={removeTask} // Pass the removeTask function as a prop
                        changeFilter={changeFilter} // Pass the changeFilter function as a prop
                        addTask={addTask} // Pass the addTask function as a prop
                        changeTaskStatus={changeTaskStatus} // Pass the changeTaskStatus function as a prop
                        filter={tl.filter} // Pass the current filter as a prop
                    />
                );
            })}
        </div>
    );
}

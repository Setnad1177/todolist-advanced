import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

let tasks1: Array<TaskType> = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "CSS", isDone: true },
    { id: 3, title: "CSS", isDone: false },
]

// let tasks2: Array<TaskType> = [
//     { id: 1, title: "Terminator", isDone: true },
//     { id: 2, title: "XXX", isDone: true },
//     { id: 3, title: "Gentlemen of fortune", isDone: false },
// ]

function App() {
    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="Movies" tasks={tasks2}/>
        </div>
    );
}

export default App;

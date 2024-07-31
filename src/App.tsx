import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

let tasks1: Array<TaskType> = [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "Redux", isDone: false},
]

useState(tasks)


function App() {

    let tasks: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ]

    function removeTask(id: number) {
        tasks = tasks.filter((t=>t.id !== id))
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks1}
                      removeTask={removeTask}
            />
           </div>
    );
}

export default App;

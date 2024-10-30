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


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })


    //task adding
    const addTask = (title: string, todolistId: string) => {
        // 1. Создадим новую таску
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        // 2. Найдем массив тасок для тудулиста, в который будем добавлять новую таску
        const todolistTasks = tasks[todolistId]
        // 3. Перезапишем массив тасок на новый массив, добавив в начало новую таску
        tasks[todolistId] = [newTask, ...todolistTasks]
        // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasks })
    }
    //useState to remove and update (show up to date) list of tasks

    const removeTask = (taskId: string, todolistId: string) => {
        // 1. Найдем таски для тудулиста, в котором будет происходить удаление
        const todolistTasks = tasks[todolistId]
        // 2. Удалим таску по которой кликнули
        const newTodolistTasks = todolistTasks.filter(t => t.id !== taskId)
        // 3. Перезапишем массив тасок на новый (отфильтрованный) массив
        tasks[todolistId] = newTodolistTasks
        // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasks, newTodolistTasks })
    }


    // changing filter state with button click (filter types: all/active/completed)

    // (old version) const changeFilter = (filter: FilterValuesType) => {
    //     setFilter(filter)
    // }
    //new version:
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId ? {...tl, filter} : tl
        })
        setTodolists(newTodolists)
    }

    //Checkbox of Task change (change Task status)
    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        // 1. Найдем таски для тудулиста, в котором будет происходить изменение
        const todolistTasks = tasks[todolistId]
        // 2. Пробежимся по таскам и изменим статус таски по которой нажали
        const newTodolistTasks = todolistTasks.map(t =>
            t.id == taskId ? { ...t, isDone: taskStatus } : t
        )
        // 3. Перезапишем массив тасок на новый массив, с уже измененным статусом у таски
        tasks[todolistId] = newTodolistTasks
        // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
        setTasks({ ...tasks })
    }


    let tasksForTodolist = tasks


    //return

    return (
        <div className="App">
            {todolists.map(tl => {

                const allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }

                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
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
                    />
                )
            })}
        </div>
    )
        ;
}

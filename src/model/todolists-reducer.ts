import {TodolistType} from "../App"
import {v1} from "uuid"

// Filter types
export type FilterValuesType = "all" | "active" | "completed"


// Initial data generation
let todolistID1 = v1()
let todolistID2 = v1()

// Initial state
const initialState: TodolistType[] = [
    {id: todolistID1, title: "What to learn", filter: "all"},
    {id: todolistID2, title: "What to buy", filter: "all"}
]

// Reducer
export const todolistsReducer = (
    state: TodolistType[] = initialState,
    action: ActionsType
): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            // Remove a todolist by ID
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            // Add a new todolist
            const newTodolist: TodolistType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: "all"
            }
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            // Change the title of a specific todolist
            return state.map(tl =>
                tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl
            )
        }
        case "CHANGE-TODOLIST-FILTER": {
            // Change the filter of a specific todolist
            return state.map(tl =>
                tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl
            )
        }
        default:
            throw new Error("Unknown action type")
    }
}



// Action creators
export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}

export const addTodolistAC = (title: string) => ({
    type: 'ADD-TODOLIST',
    payload: { title, todolistId: v1() }, // Генерация id с помощью v1()
} as const)

export const changeTodolistTitleAC = (id: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>


// Union type for all actions
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
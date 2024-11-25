import {TodolistType} from "../App"
import {v1} from "uuid"

// Filter types
export type FilterValuesType = "all" | "active" | "completed"

// Action types
type ActionsType =
    | { type: "REMOVE-TODOLIST"; payload: { id: string } }
    | { type: "ADD-TODOLIST"; payload: { title: string } }
    | { type: "CHANGE-TODOLIST-TITLE"; payload: { id: string; title: string } }
    | { type: "CHANGE-TODOLIST-FILTER"; payload: { id: string; filter: FilterValuesType } }

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
                id: v1(),
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

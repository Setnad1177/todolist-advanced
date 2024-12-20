import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { appReducer } from "./app-reducer"
import { tasksReducer } from "@/features/todolists/model/tasks-reducer"
import { todolistsReducer } from "@/features/todolists/model/todolists-reducer"

// combine reducers using combineReducers
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

// store creation
export const store = configureStore({
  reducer: rootReducer,
})

// automatic type detection of the entire state object

export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// to be able to access store in the browser console
// @ts-ignore
window.store = store

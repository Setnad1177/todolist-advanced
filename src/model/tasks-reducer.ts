import { TasksStateType } from '../App'
import { v1 } from 'uuid';


// Reducer for tasks
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const { todolistId, taskId } = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].filter(task => task.id !== taskId),
            };
        }
        case 'ADD-TASK': {
            const { todolistId, title } = action.payload;
            const newTask = {
                id: v1(), // generate unique id
                title,
                isDone: false, // false by default
            };
            return {
                ...state,
                [todolistId]: [newTask, ...state[todolistId]], // Добавляем новую задачу в начало массива
            };
        }
        case 'CHANGE-TASK-STATUS': {
            const { todolistId, taskId, isDone } = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].map(task =>
                    task.id === taskId ? { ...task, isDone } : task
                ),
            };
        }
        case 'CHANGE-TASK-TITLE': {
            const { todolistId, taskId, title } = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].map(task =>
                    task.id === taskId ? { ...task, title } : task
                ),
            };
        }
        default:
            throw new Error("I don't understand this action type");
    }
};



// Action creators
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
    return {
        type: 'REMOVE-TASK',
        payload,
    } as const
}

export const addTaskAC = (payload: { title: string; todolistId: string }) => {
    return {
        type: 'ADD-TASK',
        payload,
    } as const;
};

export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; isDone: boolean }) => ({
    type: 'CHANGE-TASK-STATUS' as const,
    payload,
});

export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => ({
    type: 'CHANGE-TASK-TITLE' as const,
    payload,
});


// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

// Union type for all actions
type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
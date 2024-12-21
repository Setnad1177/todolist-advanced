import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<any>(`/todo-lists/${todolistId}/tasks`)
  },
}

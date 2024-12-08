import { instance } from "@/common/instance"
import {
  GetTasksResponse,
  Task,
} from "@/features/todolists/api/tasksApi.types.ts"
import { BaseResponse } from "@/common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },

  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: Task }>>(
      `/todo-lists/${todolistId}/tasks`,
      {
        title,
      },
    )
  },
}

export type Task = {
  description: string | null
  title: string
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponse = {
  items: Task[]
  totalCount: number
  error: string | null
}

export type UpdateTaskModel = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

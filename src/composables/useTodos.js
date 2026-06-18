export const useFetchTodos = async () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const res = await fetch(`${backendUrl}/todos`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch todos: ${res.status}`)
  }

  return await res.json()
}

export const useCreateTodo = async (text, completed, sequence) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const body = JSON.stringify({ text: text, completed: completed, sequence: sequence })
  const res = await fetch(`${backendUrl}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })

  if (!res.ok) {
    throw new Error(`Failed to create todo: ${res.status}`)
  }

  return await res.json()
}

export const useEditTodo = async (id, text, completed, sequence) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const body = JSON.stringify({ text: text, completed: completed, sequence: sequence })
  const res = await fetch(`${backendUrl}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  })

  if (!res.ok) {
    throw new Error(`Failed to edit todo: ${res.status}`)
  }

  return await res.json()
}

export const useDeleteTodo = async (id) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const res = await fetch(`${backendUrl}/todos/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`Failed to delete todo: ${res.status}`)
  }

  return await res.json()
}

// Delete selected todos method
export const useDeleteSelectedTodos = async (ids) => {
  for (const id of ids) {
    await useDeleteTodo(id)
  }
}
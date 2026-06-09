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

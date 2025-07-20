// const API_URL = import.meta.env.VITE_API_URL
const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development"

const API_URL = NODE_DEV === "production"
  ? import.meta.env.VITE_BASE_API_URL
  : "http://localhost:8081/api"

const getTasks = async (token) => {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  return data.data
}
const getGenders = async (token) => {
  const response = await fetch(`${API_URL}/genders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  return data.data
}

const createTask = async (text, gender, token) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text, gender })
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Error al crear la tarea")
  }

  return data.data
}


const deleteTasks = async (id, token) => {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const updateTask = async (id, completed, token) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ completed: !completed })
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Error al actualizar la tarea")
  }

  return data.data
}

export { getTasks, createTask, deleteTasks, updateTask, getGenders }

// const API_URL = import.meta.env.VITE_API_URL
const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development"

const API_URL = NODE_DEV === "production"
  ? import.meta.env.VITE_BASE_API_URL
  : "http://localhost:8081/api"

const getBooks = async (token) => {
  const response = await fetch(`${API_URL}/books`, {
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

const createBook = async (text, gender, token) => {
  const res = await fetch(`${API_URL}/books`, {
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


const deleteBooks = async (id, token) => {
  await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const updateBook = async (id, completed, token) => {
  const res = await fetch(`${API_URL}/books/${id}`, {
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

export { getBooks, createBook, deleteBooks, updateBook, getGenders }

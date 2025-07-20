import { useEffect, useState } from "react"
import { createTask, deleteTasks, getGenders, getTasks, updateTask } from "../services/api"
import { useAuth } from "../context/authContext"

const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [gender, setGender] = useState([])
  const [selectedGender, setSelectedGender] = useState('')
  const [text, setText] = useState('')
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(null)

  const { token } = useAuth()

  useEffect(() => {
    const fetchingTasks = async () => {
      setLoader(true)
      try {
        const tasks = await getTasks(token)
        const gender = await getGenders(token)
        setTasks(tasks)
        setGender(gender)
      } catch (error) {
        setError("Error al recuperar los libros: " + error)
      } finally {
        setLoader(false)
      }
    }

    if (token) fetchingTasks()
  }, [token])

  /* useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()

    recognition.lang = "es-AR"
    recognition.continuous = true
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim()
      addTask(transcript.charAt(0).toUpperCase() + transcript.slice(1) + '.')
    }

    recognitionRef.current = recognition
  }, []) */

  /* const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop()
    } else {
      recognitionRef.current.start()
    }
    setIsListening(!isListening)
  } */
  const changesSelectedGender = (value) => {
   
    setSelectedGender(value)
  }
  const changesText = (value) => {
   
    setText(value)
  }

  const addTask = async () => {

    if (!text || !selectedGender) {
      console.log(error);
      setError('Debe completar todos los campos obligatorios.');
      return
    }

    
    setError(null);

    try {
      const data = await createTask(text, selectedGender, token)
      setTasks(prev => [data, ...prev]);
      setSelectedGender(null);
      setText(null);
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      if (confirm("¿Estás seguro de que quieres borrar esta tarea?")) {
        await deleteTasks(id, token)
        setTasks(tasks.filter(t => t._id !== id))
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleComplete = async ({ _id, completed }) => {
    console.log(completed)
    try {
      const data = await updateTask(_id, completed, token)
      setTasks(tasks.map(t => (t._id === _id ? data : t)))
    } catch (error) {
      console.error(error.message)
      setError(error.message)
    }
  }

  return {
    tasks,
    gender,
    loader,
    error,
    selectedGender,
    addTask,
    handleDelete,
    handleComplete,
    changesSelectedGender,
    changesText
  }
}

export { useTasks }

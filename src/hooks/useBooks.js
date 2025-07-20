import { useEffect, useState } from "react"
import { createBook, deleteBooks, getGenders, getBooks, updateBook } from "../services/api"
import { useAuth } from "../context/authContext"

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [gender, setGender] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const { token } = useAuth()

  useEffect(() => {
    const fetchingBooks = async () => {
      setLoader(true)
      try {
        const books = await getBooks(token)
        const gender = await getGenders(token)
        setBooks(books)
        setGender(gender)
      } catch (error) {
        setError("Error al recuperar los libros: " + error)
      } finally {
        setLoader(false)
      }
    }

    if (token) fetchingBooks()
  }, [token])
  const changesSelectedGender = (value) => {
   
    setSelectedGender(value)
  }
  const changesText = (value) => {
   
    setText(value)
  }

   
 const filteredBooks = books.filter(book =>
    (book?.text ?? '').toLowerCase().includes(search.toLowerCase())
  );

  

  const addBook = async () => {

    if (!text || !selectedGender) {
      setError('Debe completar todos los campos obligatorios.');
      return
    }

    
    setError(null);

    try {
      const data = await createBook(text, selectedGender, token)
      setBooks(prev => [data, ...prev]);
      setSelectedGender(null);
      setText(null);
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      if (confirm("¿Estás seguro de que quieres borrar esta tarea?")) {
        await deleteBooks(id, token)
        setBooks(books.filter(t => t._id !== id))
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleComplete = async ({ _id, completed }) => {
    try {
      const data = await updateBook(_id, completed, token)
      setBooks(books.map(t => (t._id === _id ? data : t)))
    } catch (error) {
      console.error(error.message)
      setError(error.message)
    }
  }

  return {
    books,
    gender,
    loader,
    error,
    selectedGender,
    filteredBooks,     // libros filtrados
    search,            // texto de búsqueda actual
    setSearch,         // función para actualizar la búsqueda
    addBook,
    handleDelete,
    handleComplete,
    changesSelectedGender,
    changesText
  }
}

export { useBooks }

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(item => {
      return item.id === id
    })
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    // console.log(`The id is ${id}`)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    // console.log(todos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    // console.log(e, e.target)
    let id = e.target.name;
    // console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    // console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    // console.log(newTodos)
    saveToLS()
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  return (
    <>
      <Navbar />
      <div className="md:container w-full mx-auto bg-violet-200 rounded-xl my-5 p-5 min-h-[85vh] md:w-1/2">
        <h1 className='font-bold text-center text-2xl mb-3'>iTask - Manage your Todos at one place</h1>
        <div className="addTodo flex flex-col">
          <h2 className='text-lg font-bold mb-3'>Add a Todo</h2>
          <div className="flex justify-center gap-3">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full py-1 px-3' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-900 hover:bg-violet-950 text-white py-2 px-4 rounded-full font-bold text-sm disabled:bg-violet-700'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} className='my-4' type="checkbox" checked={showFinished} /> Show Finished
        <div className='h-[1px] bg-black opacity-10 my-1 w-[90%] mx-auto'></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='my-5'>No Todos to Display here!</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between w-full my-5">
                <div className='flex gap-5 items-center'>
                  <input className='mt-[4px]' name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through w-3/4" : "w-3/4"}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-900 hover:bg-violet-950 text-white py-2 px-3 rounded-lg font-bold mx-1 text-sm'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-900 hover:bg-violet-950 text-white py-2 px-3 rounded-lg font-bold mx-1 text-sm'><MdDelete />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App

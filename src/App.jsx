import { useEffect, useState } from 'react'
import './App.css'
import { ToDoForm, ToDoItems } from './Components'
import { ToDoContextProvider } from './Contexts/ToDoContext'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'


function App() {
  const [todos, setTodos] = useState([]) // todos is array, but every todo is object {id, title, status}
  const [completedALL, setCompletedALL] = useState(false)
  const [isUserCompleteALL, setIsUserCompleteALL] = useState(false)

  const addToDo = (todo) => {
    setTodos((prevtodos) => [{id: Date.now(), ...todo}, ...prevtodos])
  }

  const updateToDo = (id, newTodo) => {
    setTodos((prevtodos) => (prevtodos.map((todo) => (todo.id === id ? newTodo : todo))))
  }


  const deleteToDo = (id) => {
    setTodos((prevtodos) => (prevtodos.filter((todo) => todo.id !== id)))
  }


  const changeStatus = (id) => {
    setTodos((prevtodos) => (prevtodos.map((todo) => (todo.id === id ? {...todo, completed: !todo.completed} : todo ))))
  }


  const completeALL = () => {
    setTodos((prevtodos) => (prevtodos.map((todo) => ({...todo, completed:!completedALL}) )))
    setCompletedALL(!completedALL)
    setIsUserCompleteALL(!completedALL)
  }


  const deleteALL = () => {
    setTodos([])
  }

  //getter 
  useEffect(() => {

    const oldToDo = JSON.parse(localStorage.getItem("listOfToDo"))

    if (oldToDo && oldToDo.length > 0) {
      setTodos(oldToDo)
    }

  }, [])

  // setter
  useEffect(() => {
    localStorage.setItem("listOfToDo", JSON.stringify(todos))
  }, [todos])



  const afterDragEnd = (result) => {

    const {source, destination, type} = result;

    if (!destination) return;

    const tempTodos = Array.from(todos)

    const [recordedItem] = tempTodos.splice(source.index, 1)

    tempTodos.splice(destination.index, 0, recordedItem)

    setTodos(tempTodos)

  }


  return (
    <ToDoContextProvider value={{todos, addToDo, updateToDo, deleteToDo, changeStatus}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <ToDoForm />
                    </div>


                    {(todos.length > 0) && (
                      <div className='py-2 flex flex-row gap-4 pb-4 justify-between' >
                        <button onClick={deleteALL} className="rounded-lg px-4 py-2 bg-red-600 text-white shrink-0">
                          Delete ALL
                        </button>

                        <p> {isUserCompleteALL ? "Well Done Bro 🏆" : "Keep it Up 👨‍💻" } </p>

                        <button onClick={completeALL} className="rounded-lg px-4 py-2 bg-green-700 text-white shrink-0">
                          { completedALL ? "Un-Check ALL" : "Completed ALL" }
                        </button>

                    </div>
                    )}
                    

                    <DragDropContext onDragEnd={afterDragEnd} >
                      

                        <Droppable droppableId='mainBoard' type='group' className="flex flex-wrap gap-y-3" >
                          
                          {(provided) => (

                            <div {...provided.droppableProps} ref={provided.innerRef}>

                              {todos.map((todo, index) => (

                                <Draggable draggableId={(todo.id).toString()} index={index} key={todo.id} >

                                  {(provided) => (

                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='mb-4' >
                                    
                                    
                                      <ToDoItems  todo={todo}/>

                                    </div>

                                  )}

                                </Draggable>

                              ))}


                              {provided.placeholder}

                            </div>  


                          )}


                        </Droppable>

                    

                    </DragDropContext>



                </div>
            </div>
    </ToDoContextProvider>
  )
}

export default App

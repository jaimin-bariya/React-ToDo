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

    // if (source.droppableId === destination.droppableId && source.index === destination.index) return;


    const sourceDroppableID = source.droppableId
    const destinationDroppableID = destination.droppableId


    const sourceIndex = source.index
    const destinationIndex = destination.index


    
    const tempTodos = Array.from(todos)

    if (sourceDroppableID === destinationDroppableID) {

      

      const [recordedItem] = tempTodos.splice(source.index, 1)

      tempTodos.splice(destination.index, 0, recordedItem)

      setTodos(tempTodos)

    }

    else {
      
      const [movedItem] = tempTodos.splice(sourceIndex, 1)
      movedItem.priority = destinationDroppableID 
      console.log(movedItem);
      
      
      
      tempTodos.splice(destinationIndex, 0, movedItem)
      setTodos(tempTodos)
    }


    

  }


  return (
    <ToDoContextProvider value={{todos, addToDo, updateToDo, deleteToDo, changeStatus}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-4xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
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
                    

                    <div className='flex gap-6 justify-around'>
                      <DragDropContext onDragEnd={afterDragEnd}  >
                        
                          <div className="flex flex-wrap gap-y-3">
                            <Droppable droppableId='normal' type='TASKS'  >
                              
                              
                              {(provided) => (

                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                  <h3 className='mb-3 text-center'>ALL</h3>

                                  {todos.filter((todo) => todo.priority === "normal").map((todo, index) => (

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
                            </div>


                          <div className="flex flex-wrap gap-y-3" >
                            <Droppable droppableId='high' type='TASKS' >
                              
                              
                              {(provided) => (
                              

                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                  <h3 className='mb-3 text-center'>High Priority</h3>

                                  {todos.filter((todo) => todo.priority === "high").map((todo, index) => (

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
                          </div>

                      

                      </DragDropContext>
                    </div>


                </div>
            </div>
    </ToDoContextProvider>
  )
}

export default App

import { useState } from "react";
import { useToDoContext } from "../../Contexts/ToDoContext";

const ToDoForm = () => {


  const [newTodo, setNewTodo] = useState("")

  const {addToDo} = useToDoContext()





  const NewToDoAdded = (e) => {
    e.preventDefault()
    

    if (!newTodo) return;

    addToDo({title: newTodo, completed:false})
    setNewTodo("")
    
  }

  return (
    <>
      <form  onSubmit={NewToDoAdded} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    </>
  );
};

export default ToDoForm;
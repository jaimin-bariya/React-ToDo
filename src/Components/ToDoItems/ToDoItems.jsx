import { useDebugValue, useEffect, useRef, useState } from "react";
import { useToDoContext } from "../../Contexts/ToDoContext";

const ToDoItems = ({todo}) => {

    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.title)
    const inputRef = useRef()

    const {updateToDo, changeStatus, deleteToDo} = useToDoContext()


    useEffect(() => {
        if (isTodoEditable && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isTodoEditable])


    const editTodo = () => {
        updateToDo(todo.id, {...todo, title: todoMsg} )
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        changeStatus(todo.id)
    }

    


  return (
    
      <div 
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7] mb-4"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
                ref={inputRef}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteToDo(todo.id)}
            >
                ❌
            </button>
        </div>
    
  );
};

export default ToDoItems;
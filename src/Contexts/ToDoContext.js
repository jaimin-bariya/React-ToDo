import { createContext, useContext } from "react";

const ToDoContext = createContext({
    todos: [
        {
            id: 1,
            title: "Task 1",
            completed: false,
        }
    ],

    addToDo: (todo) => {},
    updateToDo: (id, newTodo) => {},
    deleteToDo: (id) => {},
    changeStatus: (id) => {},

})



export const ToDoContextProvider = ToDoContext.Provider


export const useToDoContext = () => {
    return useContext(ToDoContext)
}

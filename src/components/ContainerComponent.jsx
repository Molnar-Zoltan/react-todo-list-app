import { useState, createContext, useEffect } from "react";
import InputComponent from "./InputComponent";
import AddButtonComponent from "./AddButtonComponent";
import TaskListComponent from "./TaskList/TaskListComponent";


export const TaskContext = createContext();

const ContainerComponent = () => {

    const [taskList, setTaskList] = useState([]);
    const [task, setTask] = useState("");

    // Load data from localStorage when component mounts
    useEffect(() => {
        try {
            const savedTaskList = localStorage.getItem("taskList");
            savedTaskList && setTaskList(JSON.parse(savedTaskList));
        }
        catch(error) {
            console.error(`Error parsing localStorage data: ${error}`);
        }

    }, []);

    // Save data to localStorage whenever taskList changes
    useEffect(() => {
        try {
            taskList.length > 0 ? localStorage.setItem("taskList", JSON.stringify(taskList)) : localStorage.removeItem("taskList");
        }
        catch(error) {
            console.error(`Error stringifying data for localStorage: ${error}`);
        }
    }, [taskList]);

    return(
        <div>
            <h1 className="font-bold text-6xl text-center flex flex-col pt-2">{document.title}</h1>
            <div className="flex justify-center items-center gap-2 pt-20">
                <TaskContext.Provider value={{taskList, setTaskList, task, setTask}} >
                    <InputComponent task={task} setTask={setTask} />
                    <AddButtonComponent taskList={taskList} setTaskList={setTaskList} task={task} setTak={setTask} />
                </TaskContext.Provider>
            </div>
            <div className="flex items-center flex-col pt-15 pb-5">
                <TaskContext.Provider value={{taskList, setTaskList}} > 
                    <TaskListComponent taskList = {taskList} setTaskList={setTaskList} />
                </TaskContext.Provider>
            </div>
            
        </div>
    );
}

export default ContainerComponent
import { useState, createContext } from "react";
import InputComponent from "./InputComponent";
import AddButtonComponent from "./AddButtonComponent";
import TaskListComponent from "./TaskList/TaskListComponent";


export const TaskContext = createContext();


const ContainerComponent = () => {

    const [taskList, setTaskList] = useState([]);
    const [task, setTask] = useState("");

    return(
        <div>
            <h1 className="font-bold text-4xl text-center flex flex-col pt-2">{document.title}</h1>
            <div className="flex justify-center items-center gap-2 pt-10">
                <TaskContext.Provider value={{taskList, setTaskList, task, setTask}} >
                    <InputComponent task={task} setTask={setTask} />
                    <AddButtonComponent taskList={taskList} setTaskList={setTaskList} task={task} setTak={setTask} />
                </TaskContext.Provider>
            </div>
            <div className="flex items-center flex-col pt-10 pb-5">
                <TaskContext.Provider value={{taskList, setTaskList}} > 
                    <TaskListComponent taskList = {taskList} setTaskList={setTaskList} />
                </TaskContext.Provider>
            </div>
            
        </div>
    );
}

export default ContainerComponent
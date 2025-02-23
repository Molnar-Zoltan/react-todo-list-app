import { useContext } from "react";
import { TaskContext } from "./ContainerComponent";


const InputComponent = () => {

    const {task, setTask} = useContext(TaskContext);

    const changeInputHandler = (event) => {
        setTask(event.target.value);
    }

    return(
        <input maxLength={26} value={task} onChange={changeInputHandler} id="taskInput" type="text" placeholder="Enter task..." className="bg-neutral-700 text-4xl border-2 border-neutral-400 rounded-sm px-2 py-2 h-15"/>
    );
    
};

export default InputComponent
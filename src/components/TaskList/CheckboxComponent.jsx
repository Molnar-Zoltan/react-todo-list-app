import { useContext } from "react";
import { TaskContext } from "../ContainerComponent";

const CheckboxComponent = (props) => {

    const { taskList, setTaskList } = useContext(TaskContext);


    // It updates the "completed" status of tasks based on the checkbox's "checked" state
    const checkboxHandler = (event, id) => {
        const isChecked = event.target.checked;
        console.log(id)
        setTaskList(newTaskList =>  
            newTaskList.map((newTask) => newTask.id === id ? { ...newTask, completed: isChecked } : newTask)
        );
    }

    // "onPointerDown={(e) => e.stopPropagation()}" disables the dragging interaction on the checkbox
    return (
        <input onPointerDown={(e) => e.stopPropagation()} type="checkbox" onChange={(event) => checkboxHandler(event, props.id)} id="completedCheckbox" checked={props.completed} 
               className="h-6 w-6 appearance-none bg-neutral-400 rounded-full checked:bg-green-600 border-4 border-neutral-800 cursor-pointer mr-2" /> 
    );

}

export default CheckboxComponent
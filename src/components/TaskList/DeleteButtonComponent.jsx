import { useContext } from "react";
import { TaskContext } from "../ContainerComponent";

const DeleteButtonComponent = (id) => {

    const { taskList, setTaskList } = useContext(TaskContext);


    const deleteTask = (id) => {

        const lastTaskID = taskList.length - 1;

        setTaskList(taskList.filter((task) => task.id !== id)); // Removes the selected task from the list

        id !== lastTaskID && setTaskList(prevTaskList => prevTaskList.map((task, index) =>  ({...task, id: index}))); // Reassigns IDs to all tasks if the deleted task was not the last one
    }

    //"onPointerDown={(e) => e.stopPropagation()}" disables the dragging interaction on the button
    return(
        <button onPointerDown={(e) => e.stopPropagation()} onClick={() => deleteTask(id.id)} className="fill-neutral-300 hover:fill-neutral-400 active:hover:fill-neutral-400 cursor-pointer p-0.5 z-10">
           <svg className="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M258.33-92q-44.47 0-74.9-30.23Q153-152.47 153-196.67V-731H93.33v-104.67H333v-53h292.67v53h241V-731H807v534.33q0 43.7-30.68 74.19Q745.64-92 701.67-92H258.33Zm443.34-639H258.33v534.33h443.34V-731ZM350-271.67h85.67v-386H350v386Zm174.33 0h86.34v-386h-86.34v386ZM258.33-731v534.33V-731Z"/></svg>
        </button>
    );
}

export default DeleteButtonComponent
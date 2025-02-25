import { useContext, useState } from "react";
import { TaskContext } from "./ContainerComponent";


const AddButtonComponent = () => {

    const { taskList, setTaskList, task, setTask } = useContext(TaskContext);

    const AddTask = () => {
        if (task.trim() !== "") {
            const newTask = { id: taskList.length, task: task, completed: false };
            setTaskList(() => [...taskList, newTask]); // Adds the input to the list
            setTask(""); // Clears the input after adding the task to the list
        }
    }

    return (
        <button onClick={AddTask} className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 fill-neutral-100 active:fill-orange-200 transition-colors px-2 py-0.5 rounded-sm font-bold text-2xl cursor-pointer">
            <svg className="w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M427.67-427.67H172v-104.66h255.67v-256.34h104.66v256.34h256.34v104.66H532.33V-172H427.67v-255.67Z"/></svg>
        </button>
    );
};

export default AddButtonComponent
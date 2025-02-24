import { useContext } from "react";
import { TaskContext } from "../ContainerComponent";
import DeleteButtonComponent from "./DeleteButtonComponent";


const TaskListComponent = () => {

    const { taskList, setTaskList } = useContext(TaskContext);

    // It updates the "completed" status of tasks based on the checkbox's "checked" state
    const checkboxHandler = (event, index) => {
        const isChecked = event.target.checked;

        setTaskList(newTaskList =>  
            newTaskList.map((newTask, i) => i === index ? { ...newTask, completed: isChecked } : newTask)
        );
    }
 
    // Checks if there are any "active" or "completed" tasks
    const showList = (props) => {
        switch (props) {
            case "active":
                const activeList = taskList.filter(task => task.completed == false);
                return activeList.length > 0 ? true : false; 

            case "completed":
                const completedList = taskList.filter(task => task.completed == true);
                return completedList.length > 0 ? true : false; 
        
            default:
                return false;
        }
    }

    return(
        <>
            <div className="flex flex-col items-center pb-5">
                { showList("active") &&  <h1 className="font-bold text-3xl pb-5">Active Tasks</h1> }           
                <ol className="flex flex-col gap-3.5 w-145">
                    {taskList.map((task, index) => !task.completed &&
                        <li key={index} className="flex justify-between items-center text-3xl font-bold bg-neutral-600 px-3 py-3 rounded-sm shadow-md shadow-neutral-950 h-18" >
                            <span className="max-w-120 overflow-x-auto overflow-y-hidden">
                                <input type="checkbox" onChange={(event) => checkboxHandler(event, index)} id="completedCheckbox" checked={task.completed} 
                                className="h-6 w-6 appearance-none bg-neutral-400 rounded-full checked:bg-green-600 border-4 border-neutral-800 cursor-pointer mr-2" /> 
                                {task.task}
                            </span>
                            <DeleteButtonComponent index={index} />
                        </li>
                    )}
                </ol>
            </div>

            <div className="pt-15 flex flex-col items-center pb-5">
                { showList("completed") &&  <h1 className="font-bold text-3xl pb-5">Completed Tasks</h1> }    
                <ol className="flex flex-col gap-3.5 w-145">
                {taskList.map((task, index) => task.completed &&
                    <li key={index} className="flex justify-between items-center text-3xl font-bold bg-neutral-600 px-3 py-3 rounded-sm shadow-md shadow-neutral-950 h-18" >
                        <span className="max-w-120 overflow-x-auto overflow-y-hidden text-neutral-400 custom-line-through">
                            <input type="checkbox" onChange={(event) => checkboxHandler(event, index)} id="completedCheckbox" checked={task.completed} 
                            className="h-6 w-6 appearance-none bg-neutral-400 rounded-full checked:bg-green-600 border-4 border-neutral-800 cursor-pointer mr-2" /> 
                            {task.task}
                        </span>
                        <DeleteButtonComponent index={index} />
                    </li>
                )}
                </ol>
            </div>

        </>
    );
}

export default TaskListComponent
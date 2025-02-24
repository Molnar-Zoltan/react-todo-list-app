import { useContext, useRef } from "react";
import { TaskContext } from "../ContainerComponent";
import DeleteButtonComponent from "./DeleteButtonComponent";


const TaskListComponent = () => {

    const { taskList, setTaskList } = useContext(TaskContext);
    const activeTasksRef = useRef(null);
    const completedTasksRef = useRef(null);

    // It updates the "completed" status of tasks based on the checkbox's "checked" state
    const checkboxHandler = (event, index) => {
        const isChecked = event.target.checked;

        setTaskList(newTaskList =>  
            newTaskList.map((newTask, i) => i === index ? { ...newTask, completed: isChecked } : newTask)
        );
    }
 
    // Checks if there are any "active" or "completed" tasks
    const showListName = (props) => {
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

    // Hides the active/completed task lists and displays the corresponding icon
    const hideTasks = (event, props) => {
        switch (props) {
            case "active": {
                const secondChild = event.target.closest(".list-header").children[1];
                const thirdChild = event.target.closest(".list-header").children[2];
                secondChild && secondChild.classList.toggle("hidden");
                thirdChild && thirdChild.classList.toggle("hidden");
                activeTasksRef && activeTasksRef.current.classList.toggle("hidden");
                }
                break;
            case "completed": {
                const secondChild = event.target.closest(".list-header").children[1];
                const thirdChild = event.target.closest(".list-header").children[2];
                secondChild && secondChild.classList.toggle("hidden");
                thirdChild && thirdChild.classList.toggle("hidden");
                completedTasksRef && completedTasksRef.current.classList.toggle("hidden");
                }
            default:
                break;
        }
    }

    return(
        <>
            { showListName("active") && 
            <div className="flex flex-col items-center">
             
                <div onClick={(event) => hideTasks(event, "active")} className="list-header flex justify-center items-center fill-neutral-200 cursor-pointer
                  hover:fill-neutral-500 hover:text-neutral-500 active:fill-neutral-500 active:text-neutral-500">
                    <div className="flex justify-center items-center bg-neutral-900 shadow-md shadow-neutral-950 w-145 mb-5 py-2 -ml-2">
                        <h1 className="font-bold text-3xl">Active Tasks</h1>
                    </div>  
                    <svg className="h-10 -ml-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m480-333.33-245.67-245h491.34L480-333.33Z"/></svg>
                    <svg className="h-10 -ml-12 mb-4 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M234.33-381 480-627.33 725.67-381H234.33Z"/></svg>
                </div>          
                <ol ref={activeTasksRef} className="flex flex-col gap-3.5 w-145">
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
                    {showListName("completed") && <div className="pb-15"></div>} {/* Adds bottom padding when both lists are visible. */}
                </ol>
         
            </div>
            } 



            { showListName("completed") &&  
            <div className="flex flex-col items-center">

                <div onClick={(event) => hideTasks(event, "completed")} className="list-header flex justify-center items-center fill-neutral-200 cursor-pointer
                  hover:fill-neutral-500 hover:text-neutral-500 active:fill-neutral-500 active:text-neutral-500">
                    <div className="flex justify-center items-center bg-neutral-900 shadow-md shadow-neutral-950 w-145 mb-5 py-2 -ml-2">
                        <h1 className="font-bold text-3xl">Completed Tasks</h1>
                    </div>  
                    <svg className="h-10 -ml-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m480-333.33-245.67-245h491.34L480-333.33Z"/></svg>
                    <svg className="h-10 -ml-12 mb-4 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M234.33-381 480-627.33 725.67-381H234.33Z"/></svg>
                </div> 
                <ol ref={completedTasksRef} className="flex flex-col gap-3.5 w-145">
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
            }   
        </>
    );
}

export default TaskListComponent
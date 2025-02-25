import { useContext, useRef } from "react";
import { TaskContext } from "../ContainerComponent";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import DeleteButtonComponent from "./DeleteButtonComponent";
import SortableItem from "./SortableItems";
import CheckboxComponent from "./CheckboxComponent";


const TaskListComponent = () => {

    const { taskList, setTaskList } = useContext(TaskContext);
    const activeTasksRef = useRef(null);
    const completedTasksRef = useRef(null);

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

    // Handles the drag & drop interaction
    const handleDragEnd = (event) => {
        const { active, over } = event; // active: the task being dragged, over: the task being replaced
        if (!over || active.id === over.id) return; // Exit if there's no target task or the task being dragged is the same as the target
    
        setTaskList((prevTaskList) => {
          const oldIndex = prevTaskList.findIndex((task) => task.id === active.id);
          const newIndex = prevTaskList.findIndex((task) => task.id === over.id);
          return arrayMove(prevTaskList, oldIndex, newIndex);
        });
      };

    return(
        <>
            { showListName("active") && 
            <div className="flex flex-col items-center">
             
                <div onClick={(event) => hideTasks(event, "active")} className="list-header flex justify-center items-center fill-neutral-200 cursor-pointer
                  hover:fill-neutral-500 hover:text-neutral-500 active:fill-neutral-500 active:text-neutral-500">
                    <div className="flex justify-center items-center bg-neutral-900 shadow-md shadow-neutral-950 w-145 mb-5 py-2 -ml-2">
                        <h1 className="font-bold text-3xl select-none">Active Tasks</h1>
                    </div>  
                    <svg className="h-10 -ml-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m480-333.33-245.67-245h491.34L480-333.33Z"/></svg>
                    <svg className="h-10 -ml-12 mb-4 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M234.33-381 480-627.33 725.67-381H234.33Z"/></svg>
                </div>          
                <div ref={activeTasksRef} className="flex flex-col gap-3.5 w-145">
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={taskList} strategy={verticalListSortingStrategy}>
                        {taskList.map((task) => !task.completed &&
                            <SortableItem key={task.id} task={task} />
                        )}
                    </SortableContext>
                    </DndContext>
                    {showListName("completed") && <div className="pb-10"></div>} {/* Adds bottom padding when both lists are visible */}
                </div>
         
            </div>
            } 



            { showListName("completed") &&  
            <div className="flex flex-col items-center">

                <div onClick={(event) => hideTasks(event, "completed")} className="list-header flex justify-center items-center fill-neutral-200 cursor-pointer
                  hover:fill-neutral-500 hover:text-neutral-500 active:fill-neutral-500 active:text-neutral-500">
                    <div className="flex justify-center items-center bg-neutral-900 shadow-md shadow-neutral-950 w-145 mb-5 py-2 -ml-2">
                        <h1 className="font-bold text-3xl select-none">Completed Tasks</h1>
                    </div>  
                    <svg className="h-10 -ml-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m480-333.33-245.67-245h491.34L480-333.33Z"/></svg>
                    <svg className="h-10 -ml-12 mb-4 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M234.33-381 480-627.33 725.67-381H234.33Z"/></svg>
                </div> 
                <ol ref={completedTasksRef} className="flex flex-col gap-3.5 w-145">
                {taskList.map((task) => task.completed &&
                    <li key={task.id} className="flex justify-between items-center text-3xl font-bold bg-neutral-600 px-3 py-3 rounded-sm shadow-md shadow-neutral-950 h-18" >
                        <span className="max-w-120 overflow-x-auto overflow-y-hidden text-neutral-400 custom-line-through select-none">
                            <CheckboxComponent id={task.id} completed={task.completed} />
                            {task.task}
                        </span>
                        <DeleteButtonComponent id={task.id} />
                    </li>
                )}
                </ol>
            </div>
            }   
        </>
    );
}

export default TaskListComponent
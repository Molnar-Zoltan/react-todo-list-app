import { useContext } from "react";
import { TaskContext } from "../ContainerComponent";
import DeleteButtonComponent from "./DeleteButtonComponent";


const TaskListComponent = () => {

    const { taskList, setTaskList } = useContext(TaskContext);

    return(
        <>
            <ol className="flex flex-col gap-3.5 w-145">
                {taskList.map((taskText, index) => 
                    <li key={index} className="flex justify-between items-center text-3xl font-bold bg-neutral-600 px-3 py-3 rounded-sm shadow-md shadow-neutral-950 h-18" >
                        <span className="max-w-120 overflow-x-auto overflow-y-hidden">{taskText}</span>
                        <DeleteButtonComponent index={index} />
                    </li>
                )}
            </ol>
        </>
    );
}

export default TaskListComponent
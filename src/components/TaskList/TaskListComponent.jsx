import { useContext } from "react";
import { TaskContext } from "../ContainerComponent";
import DeleteButtonComponent from "./DeleteButtonComponent";


const TaskListComponent = () => {

    const { taskList, setTaskList } = useContext(TaskContext);

    return(
        <>
            <ol className="flex flex-col gap-2 w-90">
                {taskList.map((taskText, index) => 
                    <li key={index} className="flex justify-between items-center text-xl font-bold bg-neutral-600 px-2 py-2 rounded-sm shadow-md shadow-neutral-950" >
                        <span className="max-w-70 overflow-auto">{taskText}</span>
                        <DeleteButtonComponent index={index} />
                    </li>
                )}
            </ol>
        </>
    );
}

export default TaskListComponent
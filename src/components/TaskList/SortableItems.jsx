import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteButtonComponent from "./DeleteButtonComponent";
import CheckboxComponent from "./CheckboxComponent";


const SortableItem = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="select-none flex justify-between items-center text-3xl font-bold bg-neutral-600 px-3 py-3 rounded-sm shadow-md shadow-neutral-950 h-18 cursor-grab active:cursor-grabbing">
         <div>
            <CheckboxComponent id={task.id} completed={task.completed} />
            {task.task}
         </div>
         <DeleteButtonComponent id={task.id} /> 
    </div>
  );
};

export default SortableItem
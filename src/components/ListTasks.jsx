import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDrag, useDrop } from "react-dnd";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const filterTodos = tasks.filter((task) => task.status === "todo");
    const filterInProgress = tasks.filter(
      (task) => task.status === "inprogress"
    );
    const filterCompleted = tasks.filter((task) => task.status === "completed");

    setTodos(filterTodos);
    setInProgress(filterInProgress);
    setCompleted(filterCompleted);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "completed"];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          completed={completed}
        />
      ))}
    </div>
  );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, inProgress, completed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemsToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-orange-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }

  if (status === "completed") {
    text = "Completed";
    bg = "bg-green-500";
    tasksToMap = completed;
  }

  const addItemsToSection = (id) => {
    setTasks((prev) => {
      const modifiedTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(modifiedTasks));

      toast.success("Task Status changed");

      return modifiedTasks;
    });
  };

  return (
    <>
      <div
        ref={drop}
        className={`w-72 rounded-md p-2 ${isOver ? "bg-slate-200 " : ""}`}
      >
        <Header text={text} bg={bg} count={tasksToMap.length} />
        {tasksToMap.length > 0 &&
          tasksToMap.map((task) => (
            <SingleTask
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
      </div>
    </>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <>
      <div
        className={`${bg} flex gap-4 items-center justify-between h-10 p-3 rounded-md uppercase text-sm text-white `}
      >
        {text}
        <span className='w-5 h-5 text-black rounded-full flex items-center justify-center bg-white'>
          {count}
        </span>
      </div>
    </>
  );
};

const SingleTask = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast.error("Task removed");
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md ${
        isDragging ? "opacity-25" : "opacity-100"
      } cursor-grab flex justify-between items-center gap-3`}
    >
      <p>{task.name}</p>
      <button
        className='position text-slate-500'
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </button>
    </div>
  );
};

// const [{ isDragging }, drag] = useDrag(() => ({
//   type: ItemTypes.KNIGHT,
//   collect: (monitor) => ({
//     isDragging: !!monitor.isDragging()
//   })
// }))

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  const handleTask = (e) => {
    e.preventDefault();
    if (task.name.length < 3)
      return toast.error("A task must have mmore than 3 characters");

    setTasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });

    toast.success("Task Created");

    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <form
      onSubmit={handleTask}
      className='ml-3  p-4 grid place-content-center sm:flex gap-4 w-72 sm:w-full'
    >
      <input
        type='text'
        className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-10 px-2 w-72 sm:w-96'
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button className='bg-violet-500 rounded-md px-4 h-10 text-white uppercase tracking-wide w-72 sm:w-60 '>
        create
      </button>
    </form>
  );
};

export default CreateTask;

import React, { useEffect, useState } from "react";
import { CreateTasks, ListTasks, Navbar } from "./components/Components";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  console.log(tasks);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <Navbar />
      <div className='bg-slate-100 w-screen h-screen flex flex-col items-center pt-28   gap-16'>
        <CreateTasks tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};

export default App;

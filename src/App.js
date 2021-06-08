import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

import { useState, useEffect } from "react";

const App = () => {
  const [showAddTask, setShowAddTask] = useState();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const getFromServer = await fetchTasks();
      setTasks(getFromServer);
    };

    getTasks();
  }, []);

  //Fetch Tasks from backend server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:8000/tasks/");
    const data = await res.json();

    return data;
  };

  //Add Task
  const addTask = (task) => {
    //generate a random number between 1 and 10000
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]); //...tasks is to copy in the current tasks, followed by the newTask
  };

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        title="Task List"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Task to Display"
      )}
    </div>
  );
};

export default App;

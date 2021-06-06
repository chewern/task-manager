import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState } from "react";

const App = () => {
  const [showAddTask, setShowAddTask] = useState();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Running",
      day: "15 Feb 2021 3:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Swimming",
      day: "22 Feb 2021 3:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Sleeping",
      day: "24 Feb 2021 8:30pm",
      reminder: true,
    },
  ]);

  //Add Task
  const addTask = (task) => {
    //generate a random number between 1 and 10000
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]); //...tasks is to copy in the current tasks, followed by the newTask
  };

  //Delete task
  const deleteTask = (id) => {
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
      <Header title="Task List" onAdd={() => setShowAddTask(!showAddTask)} />
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

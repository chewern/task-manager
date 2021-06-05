import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react";

const App = () => {
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

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <Header title="Task List" />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} />
      ) : (
        "No Task to Display"
      )}
    </div>
  );
};

export default App;

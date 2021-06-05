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

  return (
    <div className="container">
      <Header title="Task List" />
      <Tasks tasks={tasks} />
    </div>
  );
};

export default App;

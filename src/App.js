import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

import { useState, useEffect } from "react";

const addDocker =
  "http://ip172-18-0-45-c32cobfqf8u000cgav4g-8000.direct.labs.play-with-docker.com";

const App = () => {
  const [showAddTask, setShowAddTask] = useState();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const getFromServer = await fetchTasks();
      //console.log(getFromServer);
      setTasks(getFromServer);
    };

    getTasks();
  }, []);

  //Fetch Tasks from backend server
  const fetchTasks = async () => {
    const res = await fetch(addDocker + "/tasks/");
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(addDocker + `/tasks/${id}`);
    const data = await res.json();

    return data;
  };
  //Add Task to frontend using setTasks
  /*   const addTask = (task) => {
    //generate a random number between 1 and 10000
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]); //...tasks is to copy in the current tasks, followed by the newTask
    addTaskToBackend(newTask);
  }; */

  //Add new task to backend using fetch
  //no need to add id as this will be handled during POST at backend
  const addTask = async (task) => {
    var res = await fetch(addDocker + "/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });

    const updatedTasks = await res.json();
    //console.log(updatedTasks);
    setTasks(updatedTasks); //updating frontend
  };

  //Delete task
  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id));

    await fetch(addDocker + `/tasks/${id}`, {
      method: "DELETE",
    });
  };

  //Toggle Reminder
  /*   const changeReminder = async (id) => {
    var taskToToggle = await fetchTask(id);
    taskToToggle[0].reminder = !taskToToggle[0].reminder;
    //const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    console.log("CR ", taskToToggle);
    return taskToToggle;
  }; */

  const toggleReminder = async (id) => {
    //const updTask = await changeReminder(id);
    var taskToToggle = await fetchTask(id);
    taskToToggle[0].reminder = !taskToToggle[0].reminder;

    const res = await fetch(addDocker + `/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(taskToToggle),
    });

    const data = await res.json();
    console.log("received from backend", data.reminder);

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
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

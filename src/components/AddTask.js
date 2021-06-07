import { useState } from "react";
import DatePicker from "react-date-picker";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault(); //prevent submitting to a page

    if (!text) {
      alert("Please add a task");
      return; //this will exit the function
    }

    //this will capture the entries and send it up to onAdd in App.js
    let date = day.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    onAdd({ text, date, reminder });

    //below will clear the form after entries are capture by onAdd
    setText("");
    setDay(new Date());
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Date & Time</label>
        <DatePicker
          //type="text"
          //placeholder="Add Date & Time"
          //dateFormat="dd MM yyyy"
          value={day}
          onChange={(e) => setDay(e)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input className="btn btn-block" type="submit" value="Save Task" />
    </form>
  );
};

export default AddTask;

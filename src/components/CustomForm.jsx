import { useState } from 'react';

// library imports
import { PlusIcon } from '@heroicons/react/24/solid'

const CustomForm = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTask({
      name: task,
      dueDate: dueDate,
      checked: false,
      id: Date.now()
    })
    setTask("")
    setDueDate("")
  }

  return (
    <form
      className="todo"
      onSubmit={handleFormSubmit}
    >
      <div className="wrapper">
        <input
          type="text"
          id="task"
          className="input"
          value={task}
          onInput={(e) => setTask(e.target.value)}
          required
          autoFocus
          maxLength={60}
        />
        <label htmlFor="task" className="label">
          Add your todo here
        </label>
      </div>

      <div className='wrapper'>
        <input
          type="date"
          id="dueDate"
          className="input"
          value={dueDate}
          min={new Date().toISOString().split('T')[0]}
          onInput={(e) => setDueDate(e.target.value)}
          required
        />
        <label htmlFor="dueDate" className="label">
          Due Date
        </label>
      </div>

      <button
        className="btn"
        aria-label="Add your todo here"
        type="submit"
        >
        <PlusIcon />
      </button>
    </form>
  )
}
export default CustomForm

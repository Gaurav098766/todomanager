import { useEffect, useState } from 'react';

// library imports
import { CheckIcon } from '@heroicons/react/24/solid'

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  const [newDueDate, setNewDueDate] = useState(editedTask.dueDate);
  const [newTaskName, setNewTaskName] = useState(editedTask.name);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeEditMode()
      }
    })

    return () => {
      window.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeEditMode()
        }
      })
    }
  }, [])
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateTask({...editedTask, name: newTaskName, dueDate: newDueDate});
  }

  return (
    <div 
    role='dialog' 
    aria-labelledby='editTask'
    onClick={(e) => e.target === e.currentTarget && closeEditMode()}
    >
      <form
        className="todo"
        onSubmit={handleFormSubmit}
      >
        <div className="wrapper">
          <input
            type="text"
            id="editTask"
            className="input"
            value={newTaskName}
            onInput={(e) => setNewTaskName(e.target.value)}
            required
            autoFocus
            maxLength={60}
          />
          <label htmlFor="editTask" className="label">
            Edit your task 
          </label>
        </div>

        <div className='wrapper'>
          <input
            type="date"
            id="dueDate"
            className="input"
            value={newDueDate}
            onInput={(e) => setNewDueDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
            placeholder='Update Due Date'
          />
          <label htmlFor="dueDate" className="label">
            Update Due Date
          </label>
        </div>

        <button
          className="btn"
          aria-label={`Confirm edited task to now read ${newTaskName} with a due date of ${newDueDate}`}
          type="submit"
          >
          <CheckIcon strokeWidth={2} height={24} width={24}/>
        </button>
      </form>
    </div>
  )
}
export default EditForm

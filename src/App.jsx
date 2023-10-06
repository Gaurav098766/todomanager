import { useState } from 'react' 
import useLocalStorage from './hooks/useLocalStorage'
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);

  const [showAll, setShowAll] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showPending, setShowPending] = useState(false);


  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name, dueDate: task.dueDate}
        : t
    )))
    closeEditMode()
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const handleTaskBtn = (e) => {
    const val = e.target.innerText.toLowerCase();
    if (val === 'all') {
      setShowCompleted(false);
      setShowPending(false);
      return setShowAll(true)
    }
    else if (val === 'completed') {
      setShowAll(false);
      setShowPending(false);
      return setShowCompleted(true);
    }
    else if (val === 'pending') {
      setShowAll(false);
      setShowCompleted(false);
      return setShowPending(true);
    }
  }

  return (
    <div className="container">
      <header>
        <h1>My Todo List</h1>
      </header>
      {
        isEditing && (
          <EditForm 
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }

      <CustomForm addTask={addTask}/>

      <span className='filters' style={{display: 'flex', justifyContent: 'space-evenly'}}>
      <button className='btn' onClick={handleTaskBtn}>All</button>
      <button className='btn' onClick={handleTaskBtn}>Completed</button>
      <button className='btn' onClick={handleTaskBtn}>Pending</button>
      </span>


      {showAll && tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}

      {showCompleted && tasks && (
        <TaskList
          tasks={tasks.filter(task => task.checked === true)}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}

      {showPending && tasks && (
        <TaskList
          tasks={tasks.filter(task => task.checked === false)}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
  )
}

export default App

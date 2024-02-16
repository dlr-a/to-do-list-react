import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [hide, setHide] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryTasks, setCategoryTasks] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);

    console.log(tasks);
  }

  function handleAddCategory(categoryName) {
    console.log(categoryName);
    console.log(categories);
    setCategories((categories) =>
      categories.includes(categoryName)
        ? [...categories]
        : [...categories, categoryName]
    );
  }

  function handleDeleteTask(id) {
    console.log(id);
    console.log(tasks);
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleReset() {
    setTasks([]);
    setCategories([]);
    setCategoryName("");
    setDescription("");
  }

  function handleToggle(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleChange(newDescription) {
    console.log("deneme");
    console.log(description);
    setTasks((tasks) =>
      tasks.map((task) =>
        task.onEdit ? { ...task, description: newDescription } : task
      )
    );
    console.log(tasks);
  }

  function handleEdit(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              onEdit: !task.onEdit,
              originalDescription: task.description,
            }
          : task
      )
    );
    console.log(tasks);
  }

  function handleCancel(id) {
    console.log(tasks);
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              onEdit: !task.onEdit,
              description: task.originalDescription,
            }
          : task
      )
    );
  }

  function handleChangeHide() {
    console.log("bura");
    setHide(!hide);
    console.log(hide);
  }

  function handleCategory(category) {
    //buraya state ekle
    console.log("calisiyor");
    const filteredCategoryTasks = tasks.filter(
      (task) => task.category === category
    );
    setFilteredTasks(filteredCategoryTasks);
    setCategoryTasks(!categoryTasks);
  }

  return (
    <div className="App">
      <h1 className="header">TO DO APP</h1>
      <Form
        onAddTask={handleAddTask}
        onReset={handleReset}
        description={description}
        setDescription={setDescription}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        categories={categories}
        onAddCategory={handleAddCategory}
        onChangeHide={handleChangeHide}
      />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggle}
        onHandleEdit={handleEdit}
        onChangeEdit={handleChange}
        onCancel={handleCancel}
        hide={hide}
        categories={categories}
        categoryTasks={categoryTasks}
        filteredTasks={filteredTasks}
      />
      <Menu
        categories={categories}
        categoryName={categoryName}
        onAddHandleCategory={handleCategory}
        setCategoryName={setCategoryName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

function Menu({
  categoryName,
  categories,
  onAddHandleCategory,
  setCategoryName,
  isOpen,
  setIsOpen,
}) {
  //kosullu olarak category getirmek icin kullan

  function handleIsOpen() {
    console.log(isOpen);
    setIsOpen(!isOpen);
  }

  return (
    <div className="sidebar">
      <Dropdown>
        <Dropdown.Toggle onClick={handleIsOpen}>CATEGORIES</Dropdown.Toggle>

        {isOpen && (
          <ul>
            {/* <Category
          categories={categories}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
        /> */}
            {categories.map((category, index) => (
              <li>
                <button
                  className="sidenav"
                  key={index}
                  onClick={() => onAddHandleCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Dropdown>
    </div>
  );
}

function Form({
  onAddTask,
  onReset,
  description,
  setDescription,
  categoryName,
  setCategoryName,
  categories,
  onAddCategory,
  onChangeHide,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    if (!categoryName) return;
    if (!description) return;

    const newTask = {
      category: categoryName,
      description,
      id: Date.now(),
      onEdit: false,
      done: false,
    };

    console.log(newTask);

    onAddTask(newTask);
    onAddCategory(categoryName);
    setDescription("");
    setCategoryName("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <Categories
        categories={categories}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        onAddCategory={onAddCategory}
      />
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="addBtn">Add</button>
      <button className="addBtn" onClick={() => onReset()}>
        Reset
      </button>
      <button className="addBtn" onClick={() => onChangeHide()}>
        Hide completed
      </button>
    </form>
  );
}

function TaskList({
  tasks,
  onDeleteTask,
  onToggleTask,
  onHandleEdit,
  onChangeEdit,
  onCancel,
  hide,
  categories,
  categoryTasks,
  filteredTasks,
}) {
  const notDoneTasks = tasks.filter((task) => task.done === false);
  const showTasks = hide ? notDoneTasks : tasks;
  const currentTasks = categoryTasks ? filteredTasks : showTasks;

  return (
    <div className="list">
      <ul>
        {categories.map((category) =>
          currentTasks
            .filter((task) => task.category === category)
            .map((task) => (
              <div>
                <h3>{category}</h3>
                <Task
                  task={task}
                  key={task.id}
                  onDeleteTask={onDeleteTask}
                  onToggleTask={onToggleTask}
                  onHandleEdit={onHandleEdit}
                  onChangeEdit={onChangeEdit}
                  onCancel={onCancel}
                />
              </div>
            ))
        )}
      </ul>
    </div>
  );
}

function Categories({ categories, categoryName, setCategoryName }) {
  return (
    <div>
      <select
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      >
        <option value={""}>Choose Category</option>
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

function Task({
  task,
  onDeleteTask,
  onToggleTask,
  onHandleEdit,
  onChangeEdit,
  onCancel,
}) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => onToggleTask(task.id)}
        checked={task.done}
      />
      {!task.onEdit ? (
        <span style={task.done ? { textDecoration: "line-through" } : {}}>
          {task.description}
        </span>
      ) : (
        <form>
          <input
            type="text"
            value={task.description}
            onChange={(e) => onChangeEdit(e.target.value)}
          />
          <button type="button" onClick={() => onHandleEdit(task.id)}>
            Save
          </button>
          <button type="button" onClick={() => onCancel(task.id)}>
            Cancel
          </button>
        </form>
      )}
      <button onClick={() => onDeleteTask(task.id)}>X</button>
      <button onClick={() => onHandleEdit(task.id)}>Edit</button>
    </li>
  );
}

export default App;

//hide completed tasks
//sort by completed
//task categories

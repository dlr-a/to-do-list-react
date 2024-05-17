import { useState } from "react";
import Form from "./Form";
import TaskList from "./TaskList";
import Menu from "./Menu";

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
  }

  function handleAddCategory(categoryName) {
    setCategories((categories) =>
      categories.includes(categoryName)
        ? [...categories]
        : [...categories, categoryName]
    );
  }

  function handleDeleteTask(id) {
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
    setTasks((tasks) =>
      tasks.map((task) =>
        task.onEdit ? { ...task, description: newDescription } : task
      )
    );
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
  }

  function handleCancel(id) {
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
    setHide(!hide);
  }

  function handleCategory(category) {
    if (setCategoryTasks) {
      const filteredCategoryTasks = tasks.filter(
        (task) => task.category === category
      );
      setFilteredTasks(filteredCategoryTasks);
    }
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
        hide={hide}
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
        setCategoryTasks={setCategoryTasks}
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

export default App;

import Categories from "./Categories";

export default function Form({
  onAddTask,
  onReset,
  description,
  setDescription,
  categoryName,
  setCategoryName,
  categories,
  onAddCategory,
  onChangeHide,
  hide,
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
        placeholder="CATEGORY"
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <input
        placeholder="TASK"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="addBtn">Add</button>
      <button className="addBtn" onClick={() => onReset()}>
        Reset
      </button>
      <button className="addBtn" onClick={() => onChangeHide()}>
        {hide ? "Show completed" : "Hide completed"}
      </button>
    </form>
  );
}

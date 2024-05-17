export default function Task({
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

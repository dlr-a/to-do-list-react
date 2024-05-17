import Task from "./Task";

export default function TaskList({
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
  setCategoryTasks,
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

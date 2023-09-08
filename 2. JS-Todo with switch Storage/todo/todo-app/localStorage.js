export function getTodoList(owner) {
  const storageData = JSON.parse(window.localStorage.getItem(owner)) || [];
  return storageData;
}

export function createTodoItem({ owner, name }) {
  const storageData = getTodoList(owner);
  const task = {
    id: Math.floor(Math.random() * 1000),
    name,
    done: false,
    owner,
  };
  storageData.push(task);
  localStorage.setItem(owner, JSON.stringify(storageData));
  return task;
}

export function switchTodoItemDone({ todoItem }) {
  todoItem.done = !todoItem.done;
  const storageData = getTodoList(todoItem.owner);
  const index = storageData.findIndex((task) => task.id === todoItem.id);
  storageData[index].done = !storageData[index].done;
  localStorage.setItem(todoItem.owner, JSON.stringify(storageData));
}

export function deleteTodoItem({ element, todoItem }) {
  const storageData = getTodoList(todoItem.owner);
  if (!confirm('Вы уверены?')) return;
  const newData = storageData.filter((task) => task.id !== todoItem.id);
  element.remove();
  localStorage.setItem(todoItem.owner, JSON.stringify(newData));
}

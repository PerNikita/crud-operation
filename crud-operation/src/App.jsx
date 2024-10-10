import { useEffect, useState } from 'react'
import { addTodo, deleteTodo, getTodos, updateTodo } from './api/todos';
import { getNormalizedTodos } from './utils/get-normilize-todos';
import Todo from './components/Todo';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todosIds, setTodosIds] = useState(null);
  const [todosById, setTodosById] = useState({});
  const [isTodosLoading, setTodosLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  
  useEffect(() => {
    setError(false);
    setTodosLoading(true);

    getTodos()
    .then(todos => {
      const [ids, byIds] = getNormalizedTodos(todos);

      setTodosLoading(false);
      setTodosIds(ids);
      setTodosById(byIds);
    })

    .catch(() => {
      setError(true);
      setTodosLoading(false);
    });
  }, []);

  function handleDeleteTodo(id) {
    setTodosIds(todosIds.filter(todoId => todoId !== id));
    deleteTodo(id);
  }

  function handeToggleTodo(id) {
    const todo = {
      ...todosById[id],
      completed: !todosById[id].completed
    };
    setTodosById({
      ...todosById,
      [id]: todo
    });
    updateTodo(todo);
  }

  function handeUnputTodoTitleChange(event) {
    setTodoTitle(event.target.value)
  }

  function handleAddTodoBtnClick() {
    const id = uuidv4();
    const todo = {
      id,
      title: todoTitle,
      completed: false
    };
    setTodosById({
      ...todosById,
      [todo.id]: todo
    });
    setTodosIds([todo.id, ...todosIds])

    addTodo(todo)

  }

  return (
   <div>
      <h1>Список задач</h1>
      { isError && <p>Произошла ошибка</p> }
      { isTodosLoading && <p>Загружаем спиок задач</p> }

      <input
      type="text"
      value={todoTitle}
      onChange={(event) => handeUnputTodoTitleChange(event)} />

      <button onClick={handleAddTodoBtnClick}>Добавление задачи</button>

      { todosIds && todosIds.map(id => (
        <Todo
        key={id}
        todo={todosById[id]}
        onDelete={() => handleDeleteTodo(id)}
        onToggle={() => handeToggleTodo(id)} />
        
      )) }
   </div>
  )
}

export default App

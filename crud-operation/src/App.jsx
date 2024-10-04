import { useEffect, useState } from 'react'

const mockTodos = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  }
];

function App() {
  const [todos, setTodos] = useState(null);
  const [isTodosLoading, setTodosLoading] = useState(false);
  const [isError, setError] = useState(false);
  
  useEffect(() => {
    setError(false);
    setTodosLoading(true);
  }, []);

  return (
   <div>
      <h1>Список задач</h1>
      { isError && <p>Произошла ошибка</p> }
      { isTodosLoading && <p>Загружаем спиок задач</p> }
      { todos && todos.map(todo => (
        <p key={todo.id}>{todo.title}</p>
        
      )) }
   </div>
  )
}

export default App

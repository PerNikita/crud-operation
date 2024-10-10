import { useEffect, useState } from 'react'
import { getTodos } from './api/todos';
import { getNormalizedTodos } from './utils/get-normilize-todos';
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
  const [todosIds, setTodosIds] = useState(null);
  const [todosById, setTodosById] = useState({});
  const [isTodosLoading, setTodosLoading] = useState(false);
  const [isError, setError] = useState(false);
  
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

  return (
   <div>
      <h1>Список задач</h1>
      { isError && <p>Произошла ошибка</p> }
      { isTodosLoading && <p>Загружаем спиок задач</p> }
      { todosIds && todosIds.map(id => (
        <p key={id}>{todosById[id].title}</p>
        
      )) }
   </div>
  )
}

export default App

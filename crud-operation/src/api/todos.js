function getTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
      if(!response.ok) {
        throw new Error('api response failed');
      }
      return response.json();
    })
    .then(todos => {
      setTodosLoading(false);
      setTodos(todos)
    })

    .catch(error => {
      setError(true);
      setTodosLoading(false);
    });
}
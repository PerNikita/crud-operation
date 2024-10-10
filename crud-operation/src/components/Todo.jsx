function Todo({
    todo,
    onDelete,
    onToggle
}) {
  return (
   <div>
        <p>{todo.title}</p>
        <input
          type='checkbox'
          checked={todo.comleted}
          onChange={onToggle} />
        <button onClick={onDelete}>Удалить задачу</button>
   </div>
  )
}

export default Todo

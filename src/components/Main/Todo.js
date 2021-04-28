function Todo(props) {
  const { id, done, text } = props.todo

  return (
    <li className={ done ? 'completed' : '' }>
      <div className="view">
        <input className="toggle" type="checkbox" checked={ done }/>
        <label>{ text }</label>
        <button className="destroy"/>
      </div>
      <input className="edit" value="Create a TodoMVC template"/>
    </li>
  )
}

import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { filter as filterTodo, clearCompleted } from '../../state/todos'

const countSelector = createSelector(
  state => state.todos.items.filter(todo => !todo.done),
  doneItems => doneItems.length,
)

function Footer() {
  const itemLeftCount = useSelector(countSelector)
  const dispatch = useDispatch()

  return (
    <footer className="footer">
      <span className="todo-count"><strong>{ itemLeftCount }</strong> item left</span>
      <ul className="filters">
        <li>
          <a className="selected" href="#/" onClick={ () => dispatch(filterTodo('all')) }>All</a>
        </li>
        <li>
          <a href="#/active" onClick={ () => dispatch(filterTodo('do')) }>Active</a>
        </li>
        <li>
          <a href="#/completed" onClick={ () => dispatch(filterTodo('done')) }>Completed</a>
        </li>
      </ul>
      <button className="clear-completed" onClick={ () => dispatch(clearCompleted()) }>Clear completed</button>
    </footer>
  )
}

export default Footer

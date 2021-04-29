import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { checkAll } from '../../state/todos'
import Todo from './Todo'

const todosSelector = state => state.todos.items
const filterTypeSelector = state => state.todos.filterType
const filteredTodosSelector = createSelector(
  todosSelector,
  filterTypeSelector,
  (items, filterType) => {
    switch (filterType) {
      case 'do':
        return items.filter(todo => !todo.done)

      case 'done':
        return items.filter(todo => todo.done)

      default:
        return items
    }
  }
)

const isAllCheckedSelector = state => state.todos.items.every(todo => todo.done)

function Main() {
  const dispatch = useDispatch()
  const todos = useSelector(filteredTodosSelector)
  const Todos = todos.map(todo => <Todo key={ todo.id } { ...todo }/>)

  const isAllChecked = useSelector(isAllCheckedSelector)

  return (
    <section className="main">
      <input
        checked={ isAllChecked }
        className="toggle-all"
        id="toggle-all"
        onChange={ e => dispatch(checkAll(e.target.checked)) }
        type="checkbox"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        { Todos }
      </ul>
    </section>
  )
}

export default Main

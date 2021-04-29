import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { checkAll } from '../../state/todos'
import Todo from './Todo'

const filteredTodosSelector = createSelector(
  state => state.todos.items,
  state => state.todos.filterType,
  (todos, type) => {
    switch (type) {
      case 'do':
        return todos.filter(todo => !todo.done)

      case 'done':
        return todos.filter(todo => todo.done)

      default:
        return todos
    }
  },
)

const isAllCheckedSelector = createSelector(
  state => state.todos.items.every(todo => todo.done),
  isAllChecked => isAllChecked,
)

function Main() {
  const filteredTodos = useSelector(filteredTodosSelector)
  const isAllChecked = useSelector(isAllCheckedSelector)
  const dispatch = useDispatch()

  const handleCheckAll = e => {
    const { checked } = e.target

    dispatch(checkAll(checked))
  }

  const Todos = filteredTodos.map(todo => <Todo key={ todo.id } { ...todo } />)

  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={ isAllChecked } onChange={ handleCheckAll }/>
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        { Todos }
      </ul>
    </section>
  )
}

export default Main

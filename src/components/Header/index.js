import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add as addTodo } from '../../state/todos'

function Header() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleAddTodo = e => {
    if (!(e.key === 'Enter' || e.keyCode === 13)) {
      return
    }

    const text = value.trim()
    if (text === '') {
      return
    }

    setValue('')
    dispatch(addTodo(text))
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        autoFocus
        className="new-todo"
        onInput={ e => setValue(e.target.value) }
        onKeyDown={ handleAddTodo }
        placeholder="What needs to be done?"
        value={ value }
      />
    </header>
  )
}

export default Header

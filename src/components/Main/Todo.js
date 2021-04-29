import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  check as checkTodo,
  remove as removeTodo,
  edit as editTodo,
} from '../../state/todos'

function getClassName({ done, isEdit }) {
  const classNames = []
  if (done) {
    classNames.push('completed')
  }

  if (isEdit) {
    classNames.push('editing')
  }

  return classNames.join(' ')
}

function Todo({ id, done, text }) {
  const dispatch = useDispatch()
  const [value, setValue] = useState(text)
  const [isEdit, setEdit] = useState(false)
  const inputEl = useRef(null)

  useEffect(() => {
    if (isEdit) {
      inputEl.current.focus()
    }
  }, [isEdit])

  const edit = () => {
    const text = value.trim()
    if (text === '') {
      return
    }

    setEdit(false)
    dispatch(editTodo({ id, text }))
  }

  const handleEnter = e => {
    if (!(e.keyCode === 13 || e.key === 'Enter')) {
      return
    }

    edit()
  }

  const className = getClassName({ done, isEdit })
  return (
    <li className={ className }>
      <div className="view">
        <input
          checked={ done }
          className="toggle"
          onChange={ e => dispatch(checkTodo({ id, checked: e.target.checked })) }
          type="checkbox"
        />
        <label onDoubleClick={ () => setEdit(true) }>{ text }</label>
        <button
          className="destroy"
          onClick={ () => dispatch(removeTodo(id)) }
        />
      </div>
      <input
        className="edit"
        onInput={ e => setValue(e.target.value) }
        onKeyDown={ handleEnter }
        onBlur={ () => setEdit(false) }
        ref={ inputEl }
        value={ value }
      />
    </li>
  )
}

export default Todo

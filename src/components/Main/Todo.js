import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  check as checkTodo,
  remove as removeTodo,
  edit as editTodo,
} from '../../state/todos'

function getClassName({ done, editing }) {
  const classNames = []

  if (done) {
    classNames.push('done')
  }

  if (editing) {
    classNames.push('editing')
  }

  return classNames.join(' ')
}

function Todo({ id, done, text }) {
  const dispatch = useDispatch()

  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(text)
  const inputEl = useRef(null)

  useEffect(() => {
    inputEl.current.focus()
  }, [editing])

  const handleCheckTodo = e => {
    const { checked } = e.target

    dispatch(checkTodo({ id, checked }))
  }

  const handleEnter = e => {
    if (!(e.key === 'Enter' || e.keyCode === 13)) {
      return
    }

    edit()
  }

  const edit = () => {
    const text = value.trim()
    if (text === '') {
      return
    }

    setValue(text)
    setEditing(false)
    dispatch(editTodo({ id, text }))
  }

  const className = getClassName({ done, editing })

  return (
    <li className={ className }>
      <div className="view">
        <input className="toggle" type="checkbox" checked={ done } onChange={ handleCheckTodo }/>
        <label onDoubleClick={ () => setEditing(true) }>{ text }</label>
        <button className="destroy" onClick={ () => dispatch(removeTodo(id)) }/>
      </div>
      <input className="edit" ref={ inputEl } value={ value } onInput={ e => setValue(e.target.value) } onBlur={ () => edit() } onKeyDown={ handleEnter }/>
    </li>
  )
}

export default Todo

import { createSlice } from '@reduxjs/toolkit'

let uniqId = 0

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    filterType: 'all',
    todos: [],
  },
  reducers: {
    add: {
      reducer: (state, action) => {
        const todo = action.payload

        state.todos.push(todo)
      },
      prepare: text => {
        return {
          payload: {
            id: ++uniqId,
            done: false,
            text,
          },
        }
      },
    },

    filter: (state, action) => {
      state.filterType = action.payload
    },

    remove: (state, action) => {
      const { id } = action.payload

      return state.todos.filter(todo => todo.id !== id)
    },

    check: (state, action) => {
      const { id, checked } = action.payload

      return state.todos.map(todo => {
        return todo.id === id
          ? { ...todo, done: checked }
          : todo
      })
    },
  },
})

export const { add, filter, remove, check } = todosSlice.actions

export default todosSlice.reducer

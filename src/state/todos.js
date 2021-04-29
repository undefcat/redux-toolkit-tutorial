import { createSlice } from '@reduxjs/toolkit'

let uniqId = 0

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    filterType: 'all',
    items: [],
  },

  reducers: {
    add: {
      reducer: (state, action) => {
        state.items.push(action.payload)
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

    check: (state, action) => {
      const { id, checked } = action.payload

      state.items = state.items.map(todo =>
        todo.id === id
          ? { ...todo, done: checked }
          : todo
      )
    },

    edit: (state, action) => {
      const { id, text } = action.payload

      state.items = state.items.map(todo =>
        todo.id === id
          ? { ...todo, text }
          : todo
      )
    },

    remove: (state, action) => {
      const id = action.payload

      state.items = state.items.filter(todo => todo.id !== id)
    },

    filter: (state, action) => {
      state.filterType = action.payload
    },

    clearCompleted: state => {
      state.items = state.items.filter(todo => !todo.done)
    },

    checkAll: (state, action) => {
      const done = action.payload

      state.items = state.items.map(todo => ({
        ...todo,
        done,
      }))
    }
  },
})

export const {
  add,
  check,
  edit,
  remove,
  filter,
  clearCompleted,
  checkAll,
} = todosSlice.actions

export default todosSlice.reducer

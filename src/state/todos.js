import { createSlice } from '@reduxjs/toolkit'

let uniqId = 0

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    filterType: 'all',
    items: [
      { id: ++uniqId, done: false, text: 'redux-toolkit 공부하기' },
      { id: ++uniqId, done: true, text: '할게 많다' },
    ],
  },
  reducers: {
    add: {
      reducer: (state, action) => {
        const todo = action.payload

        state.items.push(todo)
      },
      prepare: text => ({
        payload: {
          id: ++uniqId,
          done: false,
          text,
        }
      }),
    },

    filter: (state, action) => {
      state.filterType = action.payload
    },

    remove: (state, action) => {
      const id = action.payload

      state.items = state.items.filter(todo => todo.id !== id)
    },

    edit: (state, action) => {
      const { id, text } = action.payload

      state.items = state.items.map(todo =>
        todo.id === id
          ? { ...todo, text }
          : todo
      )
    },

    check: (state, action) => {
      const { id, checked } = action.payload

      state.items = state.items.map(todo =>
        todo.id === id
          ? { ...todo, done: checked }
          : todo
      )
    },

    checkAll: (state, action) => {
      const checked = action.payload

      state.items = state.items.map(todo => ({
        ...todo,
        done: checked,
      }))
    },

    clearCompleted: state => {
      state.items = state.items.filter(todo => !todo.done)
    },

  },
})

export const {
  add,
  filter,
  remove,
  check,
  checkAll,
  clearCompleted,
  edit,
} = todosSlice.actions

export default todosSlice.reducer

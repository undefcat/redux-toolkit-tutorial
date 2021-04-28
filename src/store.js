import { configureStore } from '@reduxjs/toolkit'
import todos from './state/todos'

export default configureStore({
  reducer: {
    todos,
  },
})

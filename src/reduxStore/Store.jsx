import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slice/user/userSlice.jsx"


export const store = configureStore({ reducer: {
    user: counterReducer,
} })
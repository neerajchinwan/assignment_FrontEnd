import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasktwo/taskSlice'


export const store = configureStore({
    reducer: {
        task: taskReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store;
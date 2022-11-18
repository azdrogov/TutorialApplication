import {createSlice} from '@reduxjs/toolkit';
import {initialTutorial} from '../../app/states';

const tutorialsSlice = createSlice({
    name: 'tutorialsSlice',
    initialState: initialTutorial,
    reducers: {
        saveTutorial(state, action) {
            const newState = {...state}
            const payload = action.payload

            newState.id = payload.id
            newState.title = payload.title
            newState.description = payload.description
            newState.published = payload.published
            console.log('NewState', newState)
        }
    }
})

export const {saveTutorial} = tutorialsSlice.actions

export default tutorialsSlice.reducer
import {createSlice} from '@reduxjs/toolkit';
import {initialTutorial, ITutorial} from '../../app/states';

const tutorialsSlice = createSlice({
    name: 'tutorialsSlice',
    initialState: initialTutorial,
    reducers: {
        saveTutorial(state: ITutorial, action) {
            const newState = {...state}
            const payload = action.payload

            newState.id = payload.id
            newState.title = payload.title
            newState.description = payload.description
            newState.published = payload.published
            return newState
        },
        changeParam(state: ITutorial, action: { payload: { name: string, value: string | boolean }, type: string }) {
            const newState = {...state}
            const payload = action.payload
            return {...newState, [payload.name]: payload.value}
        }
    }
})

export const {saveTutorial, changeParam} = tutorialsSlice.actions

export default tutorialsSlice.reducer
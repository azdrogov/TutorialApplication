import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TutorialState {
    tutorials: Tutorial[],
    errorMessage: string
}

type Tutorial = {
    id: string,
    title: string,
    description: string,
    published: boolean
}

const initialState: TutorialState = {
    tutorials: [],
    errorMessage: ''
}

export const tutorialSlice = createSlice({
    name: 'tutorials',
    initialState,
    reducers: {
        createTutorial: (state, action: PayloadAction<Tutorial>) => {
            state.tutorials.concat(action.payload)
        }
    }
})

export const selectTutorials = (state: TutorialState) => state.tutorials

export default tutorialSlice.reducer
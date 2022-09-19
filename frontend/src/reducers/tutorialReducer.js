import {createTutorial, fetchTutorials, setTutorials, tutorialsError} from "../actions/tutorialsActions";
import {handleActions} from "redux-actions";

export default handleActions({
    [fetchTutorials.toString()]: (state) => {
        return state;
    },
    [setTutorials.toString()]: (state, payload) => {
        const newState = state;
        return {
            ...newState,
            tutorials: payload.payload
        }
    },
    [tutorialsError.toString()]: (state, payload) => {
        const newState = state;
        return {
            ...newState,
            errorMessage: payload.payload
        }
    },
    [createTutorial.toString()]: (state, payload) => {
        return state;
    },

},
    {
        root: {
            tutorials: [{id: '', title: '', description: '', published: false}],
            errorMessage: ""
        }
    }
)
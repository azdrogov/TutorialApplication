import {handleActions} from 'redux-actions';
import {fetchTutorials, setTutorials, tutorialsError} from "../actions/tutorialsActions";

export default handleActions({
    [fetchTutorials.toString()]: (state) => {
        return state;
    },
    [setTutorials.toString()]: (state, payload) => {
        console.log("payload", payload)
        const newState = state;
        return {
            ...newState,
            tutorials: payload
        }
    },
    [tutorialsError.toString()]: (state, payload) => {
        const newState = state;
        return {
            ...newState,
            errorMessage: payload.payload
        }
    }
},
    {}
)
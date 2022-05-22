import {handleActions} from 'redux-actions';
import {fetchTutorials, setTutorials} from "../actions/tutorialsActions";

export default handleActions({
    [fetchTutorials.toString()]: (state) => {
        console.log('fetchTutorials')
        return state;
    },
    [setTutorials.toString()]: (state, { payload }) => {
        console.log('setTutorials')
        const newState = state;
        return {
            ...newState,
            tutorials: payload
        }
    },
},
    {}
)
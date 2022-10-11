import {Tutorial, TutorialResponseBody} from '../../state/StoreNamespace';
import {fetchTutorials, setTutorials} from '../actions/tutorials';
import { handleActions } from 'redux-actions';
import initialState from '../../state/InitialState';

type PayloadType = TutorialResponseBody;

export default handleActions<TutorialResponseBody, TutorialResponseBody>({
    [fetchTutorials.toString()]: (state: TutorialResponseBody) => {
        return state;
    },
},
    initialState.root)

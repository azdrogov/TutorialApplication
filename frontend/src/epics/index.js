import {combineEpics} from "redux-observable";
import {loadTutorials} from './tutorials';

export default combineEpics(
    loadTutorials,
);

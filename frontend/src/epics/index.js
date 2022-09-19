import {combineEpics} from "redux-observable";
import {createTutorialAction, loadTutorials} from './tutorials';

export default combineEpics(
    loadTutorials,
	createTutorialAction
);

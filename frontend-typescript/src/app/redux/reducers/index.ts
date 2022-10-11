import {combineReducers} from '@reduxjs/toolkit';
import tutorialReducer from './tutorialReducer';

export default combineReducers({
    root: tutorialReducer
});
import {configureStore} from "@reduxjs/toolkit";
import rootReducers from './reducers'
import logger from 'redux-logger'
import {createEpicMiddleware} from "redux-observable";
import epics from "./epics";

const initialState = {
    root: {
        tutorials: [{id: '', title: '', description: '', published: false}],
        errorMessage: ''
    }
}
const epicMiddleware = createEpicMiddleware();
const storeResult = () => {
    const store = configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, epicMiddleware),
        preloadedState: initialState
    });
    epicMiddleware.run(epics);
    return store;
}
export default storeResult();

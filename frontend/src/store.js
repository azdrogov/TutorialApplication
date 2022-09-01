import {configureStore} from "@reduxjs/toolkit";
import rootReducers from './reducers'
import epics from './epics'
import { createEpicMiddleware } from 'redux-observable';
import thunk from "redux-thunk";

const initialState = {
    root: {
        tutorials: [],
        errorMessage: ""
    }
}

const epicMiddleware = createEpicMiddleware();
const storeResult = () => {
    const store = configureStore({
        reducer: rootReducers,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([epicMiddleware]),
    });
    epicMiddleware.run(epics)
    return store;
}
export default storeResult();

import {configureStore} from '@reduxjs/toolkit';
import {createEpicMiddleware} from "redux-observable";
import tutorialsReducer from './redux/reducers';
import logger from 'redux-logger'
import initialState from './state/InitialState';

const epicMiddleware = createEpicMiddleware();

const storeResult = () => {
    return configureStore({
        reducer: tutorialsReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, epicMiddleware),
        preloadedState: initialState
    });
}

export default storeResult();


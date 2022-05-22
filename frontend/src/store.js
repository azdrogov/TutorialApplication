import {configureStore} from "@reduxjs/toolkit";
import rootReducers from './reducers'
import epics from './epics'
import { createEpicMiddleware } from 'redux-observable';
import thunk from "redux-thunk";

const initialState = {
    root: {
        tutorials: []
    }
}

const epicMiddleware = createEpicMiddleware();
const storeResult = () => {
    console.log('1 Я сюда зашёл')
    const store = configureStore({
        reducer: rootReducers,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([epicMiddleware]),
    });
    console.log('2 и до сюда дошёд')
    epicMiddleware.run(epics)
    console.log('3 и до сюда дошёд')
    return store;
}
export default storeResult();

import {createAction} from "@reduxjs/toolkit";

export const fetchTutorials = createAction('FETCH_TUTORIALS');
export const setTutorials = createAction('SET_TUTORIALS');
export const tutorialsError = createAction('TUTORIALS_ERROR');
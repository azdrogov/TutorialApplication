import {createTutorial, fetchTutorials, setTutorials, tutorialsError} from "../actions/tutorialsActions";
import {mergeMap, map, catchError} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import {ofType} from "redux-observable";

export const loadTutorials = action$ => action$.pipe(
	ofType(fetchTutorials),
	mergeMap(() =>
		ajax.getJSON('http://localhost:8000/api/tutorials', {'Accept': 'application/json, text/html'})
			.pipe(
				map(response => {
					return setTutorials(response)
				}),
				catchError(error => tutorialsError(error.message))
			)
	)
)

export const createTutorialAction = action$ => action$.pipe(
	ofType(createTutorial),
	mergeMap((action) => {
		return ajax.post('http://localhost:8000/api/tutorials', action.payload)
			.pipe(
				map(() => {
					return fetchTutorials()
				}),
				catchError(error => tutorialsError(error.message))
			)
	})
)

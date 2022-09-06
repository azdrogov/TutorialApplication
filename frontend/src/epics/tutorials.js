import {fetchTutorials, setTutorials, tutorialsError} from "../actions/tutorialsActions";
import {mergeMap, map, catchError} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import {ofType} from "redux-observable";

export const loadTutorials = action$ => action$.pipe(
        ofType(fetchTutorials.toString()),
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

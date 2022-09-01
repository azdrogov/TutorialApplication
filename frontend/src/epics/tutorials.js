import { ofType } from 'redux-observable';
import {fetchTutorials, setTutorials, tutorialsError} from "../actions/tutorialsActions";
import {mergeMap, map, catchError, filter, switchMap} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import {  of } from 'rxjs';

export const loadTutorials = (action$) => action$.pipe(
        ofType(fetchTutorials.toString()),
        mergeMap((action) => {
            return (
              ajax.get('http://localhost:8000/api/tutorials', {'Accept': 'application/json, text/html'})
                .pipe(
                  map(response => {
                    console.log("response", response)
                    return of(setTutorials(response.response));
                  }),
                  catchError(error => {
                    console.error(error)
                    return of(tutorialsError(error.message));
                  })
                )
            )
        })
    )

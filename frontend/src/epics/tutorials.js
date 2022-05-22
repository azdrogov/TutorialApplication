import { ofType } from 'redux-observable';
import {fetchTutorials, setTutorials, tutorialsError} from "../actions/tutorialsActions";
import {mergeMap, map, catchError} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import {Observable} from "rxjs";

export const loadTutorials = (action$, store) => action$.pipe(
        ofType(fetchTutorials.toString()),
        map((action) => {
            console.log('111', action)
            ajax.get('http://localhost:8000/api/tutorials', {'Content-Type': 'image/jpeg', 'Accept': 'application/octet-stream'})
                .pipe(
                map(response => {
                    console.log('response')
                    const t = ['Один', 'Два']
                    console.log('response')
                    return setTutorials(t)
                }),
                catchError(error => {
                    console.error(error)
                    return tutorialsError()
                })
            )
            }
        )
    )

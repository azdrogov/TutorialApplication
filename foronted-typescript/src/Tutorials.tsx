import {useAppSelector, useAppDispatch} from './app/hooksTutorials';
import {selectTutorials} from './features/tutorials/tutorialSlice';
import styles from './features/counter/Counter.module.css';
import React from 'react';

export function Tutorials() {
    const tutorials = useAppSelector(selectTutorials);
    const dispatch = useAppDispatch();

    return (
        <div>
            <span className={styles.value}>
                {tutorials.map(t => {
                    return (<h6>{t.title}</h6>)
                })}
            </span>
        </div>
    )
}
import {TutorialsProps} from './types/tutorialsProps';
import {useEffect} from 'react';

const Tutorials = (props: TutorialsProps) => {
    const {tutorials, errorMessage} = props;
    const {loadTutorials, createTutorial} = props;

    useEffect(() => {
        loadTutorials();
    }, [loadTutorials])

    return (
        <div>
            <>
                {tutorials.map(tutorial => {
                    return (<h6 key={tutorial.id}>{tutorial.title}</h6>)
                })}
                <h6>{errorMessage}</h6>
            </>
        </div>
    )
}

export default Tutorials;
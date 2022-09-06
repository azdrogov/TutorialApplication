import {useEffect} from "react";

const Tutorials = (props) => {
    const { tutorials, errorMessage } = props;
    const { loadTutorials, dispatch } = props;

    useEffect(() => {
        loadTutorials();
    }, [dispatch])

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
import {useEffect} from "react";
import CreateTutorialForm from "./CreateTutorialForm";

const Tutorials = (props) => {
    const { tutorials, errorMessage } = props;
    const {
        loadTutorials,
        createTutorial
    } = props;
    const {dispatch} = props;

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

                <CreateTutorialForm onSubmit={createTutorial}/>
            </>
        </div>
    )
}

export default Tutorials;
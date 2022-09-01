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
                <h6 >{tutorials}</h6>
                <h6 >{errorMessage}</h6>
            </>
        </div>
    )
}

export default Tutorials;
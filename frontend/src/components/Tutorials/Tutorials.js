import {useEffect} from "react";

const Tutorials = (props) => {
    const { tutorials } = props;
    const { loadTutorials, dispatch } = props;

    useEffect(() => {
        console.log('PROPS', props)
        loadTutorials();
    }, [dispatch])

    return (
        <div>
            <>
                <h6 >{"t"}</h6>
            </>
        </div>
    )
}

export default Tutorials;
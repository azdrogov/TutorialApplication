import {useParams} from 'react-router-dom';
import {useGetTutorialByIdQuery} from './tutorialsApi';

export function TutorialCard() {
    const {id} = useParams();
    const {data, isLoading} = useGetTutorialByIdQuery(id);
    return (
        <>
            <div>
                {data?.title}
            </div>
        </>
    )
}
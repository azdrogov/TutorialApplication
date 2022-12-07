import {Link, useParams} from 'react-router-dom';
import {useGetTutorialByIdQuery} from './tutorialsApi';
import back from '../../images/back.png'
import edit from '../../images/edit.png'
import {useEffect, useState} from 'react';
import {EditCard} from './EditCard';
import {saveTutorial} from './tutorialsSlice';
import {useDispatch} from 'react-redux';

export function TutorialCard() {
    const {id} = useParams();
    const {data, refetch} = useGetTutorialByIdQuery(id);
    const [isEdit, editTumbler] = useState(false)
    const dispatch = useDispatch();

    const onEditButton = () => {
        editTumbler(!isEdit)
    }

    useEffect(() => {
        refetch()
        if (data) {
            dispatch(saveTutorial(data))
        }
    }, [dispatch, data])

    return (
        <>
            {isEdit ? (<EditCard />) : (
                <div className={'card'}>
                    <Link className={'back-button'} to={'/'}>
                        <img src={back} />
                    </Link>
                    <div className={'field'}>
                        <p className={'title'}>{data?.title}</p>
                        <div className={'edit-button'} onClick={onEditButton}><img src={edit} /></div>
                    </div>
                    <div className={'field'}>
                        {data?.description ?
                            <p>{data?.description}</p> :
                            <p>Туториал не описан</p>
                        }
                    </div>
                    <div className={'field published'}>
                        {data?.published ? <i>Опубликовано</i> : <b>Не опубликовано</b>}
                    </div>
                </div>
            )}
        </>
    )
}
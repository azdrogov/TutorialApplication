import {Link, useParams} from 'react-router-dom';
import {useGetTutorialByIdQuery} from './tutorialsApi';
import back from '../../images/back.png'
import edit from '../../images/edit.png'
import {useEffect, useState} from 'react';
import {EditCard} from './EditCard';
import {saveTutorial} from './tutorialsSlice';

export function TutorialCard() {
    const {id} = useParams();
    const {data} = useGetTutorialByIdQuery(id);
    const [isEdit, editTumbler] = useState(false)

    const onEditButton = () => {
        editTumbler(!isEdit)
    }

    useEffect(() => {
        console.log('Привет', data)
        saveTutorial(data)
    }, [data])

    return (
        <>
            {isEdit ? (<EditCard />) : (
                <div className={'card'}>
                    <Link to={'/'}>
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
import React, {ChangeEvent, FormEvent, useEffect} from 'react';
import {
    useAddTutorialMutation,
    useDeleteTutorialMutation,
    useGetTutorialsQuery
} from './tutorialsApi';
import {initialState, initialTutorial} from '../../app/states';
import delButton from '../../images/delete.png'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {saveTutorial} from './tutorialsSlice';

export function Tutorials() {
    const {data = initialState, isLoading } = useGetTutorialsQuery('');
    const tutorial = useSelector((state: RootState) => state.tutorial)
    const [addTutorial] = useAddTutorialMutation()
    const [deleteTutorial] = useDeleteTutorialMutation()
    const dispatch = useDispatch();

    const handleAddTutorial = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (tutorial) {
            await addTutorial(tutorial).unwrap()
        }
        saveTutorial(initialTutorial);
    }

    const handleDeleteTutorial = async (id: string) => {
        await deleteTutorial(id).unwrap()
    }

    const onChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(saveTutorial({...tutorial, [e.target.name]: e.target.value}))
    }

    useEffect(() => {
        if (data) {
            dispatch(saveTutorial(initialTutorial))
        }
    }, [dispatch, data])

    return (
        <>
            <form className={'form'} onSubmit={handleAddTutorial}>
                <div className={'form-data'}>
                    <input placeholder={'Заголовок'} type={'text'} name={'title'} onChange={onChangeFormData} value={tutorial.title}/>
                    <input placeholder={'Описание'} type={'text'} name={'description'} onChange={onChangeFormData} value={tutorial.description}/>
                </div>
                <div className={'form-button'}>
                    <button type={'submit'}>&gt;</button>
                </div>
            </form>
            {isLoading ? <p className={'loading'}>Loading...</p> :
                <ol className={'tutorials-list'}>
                    {data.filter(val => val.title).map((val) => (
                        <li key={val.id}>
                            <div className={'tutorial-info'}>
                                <Link to={`/${val.id}`} className={'card-button'}>
                                    <div className={'title'}>{val.title}</div>
                                </Link>
                                <p>{val.description}</p>
                            </div>
                            <div className={'delete-button'} onClick={() => handleDeleteTutorial(val.id)}><img src={delButton} alt={'delete'}/></div>
                        </li>
                    ))}
                </ol>
            }
        </>
    )
}
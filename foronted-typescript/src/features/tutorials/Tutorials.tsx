import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAddTutorialMutation, useDeleteTutorialMutation, useGetTutorialsQuery} from './tutorialsApi';
import {initialState, initialTutorialInput, ITutorialInput} from '../../app/states';

export function Tutorials() {
    const {data = initialState, isLoading} = useGetTutorialsQuery('');
    const [newTutorial, setNewTutorial] = useState<ITutorialInput>(initialTutorialInput)
    const [addTutorial] = useAddTutorialMutation()
    const [deleteTutorial] = useDeleteTutorialMutation()

    const handleAddTutorial = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (newTutorial) {
            await addTutorial(newTutorial).unwrap()
        }
        setNewTutorial(initialTutorialInput);
    }

    const handleDeleteTutorial = async (id: string) => {
        await deleteTutorial(id).unwrap()
    }

    const onChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === 'checkbox') {
            setNewTutorial({...newTutorial, [e.target.name]: e.target.checked})
        } else {
            setNewTutorial({...newTutorial, [e.target.name]: e.target.value})
        }
    }

    return (
        <>
            <form onSubmit={handleAddTutorial}>
                <div className={'form-data'}>
                    <input placeholder={'Заголовок'} type={'text'} name={'title'} onChange={onChangeFormData}/>
                    <input placeholder={'Описание'} type={'text'} name={'description'} onChange={onChangeFormData}/>
                </div>
                <div className={'form-button'}>
                    <button type={'submit'}>&gt;</button>
                </div>
            </form>
            <ol className={'tutorials-list'}>
                {data.filter(val => val.title).map((val) => (
                    <li key={val.id}>
                        <label>{val.title}</label>
                        <p>{val.description}</p>
                    </li>
                    )
                )}
            </ol>
        </>
    )
}
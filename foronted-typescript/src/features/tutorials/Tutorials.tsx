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

    if (isLoading) return <h1>Loading...</h1>
    return (
        <div>
            <div>
                <form onSubmit={handleAddTutorial}>
                    <input type={'text'} name={'title'} placeholder='Название' value={newTutorial.title} onChange={onChangeFormData}/>
                    <input type={'text'} name={'description'} placeholder='Описание' value={newTutorial.description} onChange={onChangeFormData}/>
                    <input type={'checkbox'} name={'published'} placeholder='Опубликовано?' checked={newTutorial.published} onChange={onChangeFormData}/>

                    <button type="submit">Кнопка</button>
                </form>
            </div>
            <ul>
                {data.map(tutorial => (
                    <li key={tutorial.id} onClick={() => handleDeleteTutorial(tutorial.id)}>
                        {tutorial.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}
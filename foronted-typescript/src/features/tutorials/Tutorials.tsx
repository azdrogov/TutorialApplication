import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useAddTutorialMutation, useGetTutorialsQuery} from './tutorialsApi';
import {initialState, ITutorialInput} from '../../app/states';

export function Tutorials() {
    const {data = initialState, isLoading} = useGetTutorialsQuery('');

    const [newTutorial, setNewTutorial] = useState<ITutorialInput>({title: '', description: '', published: false})
    const [addTutorial, {isError}] = useAddTutorialMutation()

    const handleAddTutorial = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        debugger
        if (newTutorial) {
            await addTutorial(newTutorial).unwrap()
        }
    }

    const onChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTutorial({...newTutorial, [e.target.name]: e.target.value})
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
                    <li key={tutorial.id}>
                        {tutorial.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}
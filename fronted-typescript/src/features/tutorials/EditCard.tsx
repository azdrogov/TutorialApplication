import {Link} from 'react-router-dom';
import back from '../../images/back.png';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useUpdateTutorialMutation} from './tutorialsApi';
import {changeParam} from './tutorialsSlice';

export function EditCard() {
    const tutorial = useSelector((state: RootState) => state.tutorial)
    const [updateTutorial] = useUpdateTutorialMutation()
    const dispatch = useDispatch();

    const handleEditTutorial = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await updateTutorial(tutorial).unwrap()
    }

    const onChangeField = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.name === 'published' ? e.target.checked : e.target.value
        const newField = {name: e.target.name, value: newValue}

        dispatch(changeParam(newField))
    }
    return (
        <>
            <div className={'form'}>
                <Link className={'back-button'} to={'/'}>
                    <img src={back} />
                </Link>
                <form className={'edit-form'} onSubmit={handleEditTutorial}>
                    <div className={'edit-data'}>
                        <div className={'edit-field text'}>
                            <input className={'edit-title edit-text-input'} type={'text'} name={'title'} onChange={onChangeField} value={tutorial.title}/>
                        </div>
                        <div className={'edit-field text'}>
                            <input className={'edit-description edit-text-input'} type={'text'} name={'description'} onChange={onChangeField} value={tutorial.description}/>
                        </div>
                    </div>
                    <div className={'form-button'}>
                        <button type={'submit'}>&gt;</button>
                    </div>
                    <div className={'edit-field published'}>
                        <input type={'checkbox'} name={'published'} onChange={onChangeField} checked={tutorial.published}/>
                    </div>
                </form>
            </div>
        </>
    )
}
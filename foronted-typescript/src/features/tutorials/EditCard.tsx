import {Link} from 'react-router-dom';
import back from '../../images/back.png';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import React from 'react';

export function EditCard() {
    const tutorial = useSelector((state: RootState) => state.tutorial)
    return (
        <>
            <div className={'form'}>
                <Link className={'back-button'} to={'/'}>
                    <img src={back} />
                </Link>
                <form className={'edit-form'}>
                    <div className={'edit-data'}>
                        <div className={'edit-field text'}>
                            <input className={'edit-title edit-text-input'} type={'text'} value={tutorial.title}/>
                        </div>
                        <div className={'edit-field text'}>
                            <input className={'edit-description edit-text-input'} type={'text'} value={tutorial.description}/>
                        </div>
                    </div>
                    <div className={'form-button'}>
                        <button type={'submit'}>&gt;</button>
                    </div>
                    <div className={'edit-field published'}>
                        <input type={'checkbox'} checked={tutorial.published}/>
                    </div>
                </form>
            </div>
        </>
    )
}
import {Link} from 'react-router-dom';
import back from '../../images/back.png';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';

export function EditCard() {
    const tutorial = useSelector((state: RootState) => state.tutorial)
    return (
        <>
            <div className={'edit-card'}>
                <Link to={'/'}>
                    <img src={back} />
                </Link>
                <form className={'edit-form'}>
                    <div className={'edit-field'}>
                        <input className={'edit-title'} type={'text'} value={tutorial.title}/>
                    </div>
                    <div className={'edit-field'}>
                        <input className={'edit-description'} type={'text'} value={tutorial.description}/>
                    </div>
                    <div className={'edit-field published'}>
                        <input type={'checkbox'} checked={tutorial.published}/>
                    </div>
                </form>
            </div>
        </>
    )
}
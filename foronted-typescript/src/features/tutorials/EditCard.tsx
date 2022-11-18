import {Link} from 'react-router-dom';
import back from '../../images/back.png';
import {useSelector} from 'react-redux';

export function EditCard() {
    const tutorial = useSelector(state => state.tutorialsSlice)
    return (
        <>
            <div className={'edit-card'}>
                <Link to={'/'}>
                    <img src={back} />
                </Link>
                <form className={'edit-form'}>
                    <div className={'edit-field'}>
                        <input className={'edit-title'} type={'text'}/>
                    </div>
                    <div className={'edit-field'}>
                        <input className={'edit-description'} type={'text'}/>
                    </div>
                    <div className={'edit-field published'}>
                        <input type={'checkbox'}/>
                    </div>
                </form>
            </div>
        </>
    )
}
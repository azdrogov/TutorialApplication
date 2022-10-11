import {connect} from 'react-redux';
import Tutorials from './Tutorials';
import Store from '../app/state/StoreNamespace';
import {Dispatch} from '@reduxjs/toolkit';
import {fetchTutorials, setTutorials} from '../app/redux/actions/tutorials';

const mapStateToProps = (state: Store.IRootState) => ({
    tutorials: state.root.tutorials,
    errorMessage: state.root.errorMessage
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadTutorials(): void {
        dispatch(fetchTutorials());
    },
    createTutorial(): void {
        dispatch(setTutorials());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tutorials)
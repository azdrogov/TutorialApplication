import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from './store';
import {TutorialState} from '../features/tutorials/tutorialSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TutorialState> = useSelector;
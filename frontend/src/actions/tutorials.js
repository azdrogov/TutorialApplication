import Api from '../services/tutorial.service'
import {CREATE_TUTORIAL, DELETE_ALL_TUTORIALS, DELETE_TUTORIAL, RETRIEVE_TUTORIALS, UPDATE_TUTORIAL} from "./types";

export const createTutorial = (title, description) => async (dispatch) => {
  try {
    const res = await Api.create({title, description});
    dispatch({
      type: CREATE_TUTORIAL,
      payload: res.data
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const retrieveTutorial = () => async (dispatch) => {
  try {
    const res = await Api.getAll();
    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: res.data
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateTutorial = (id, data) => async (dispatch) => {
  try {
    const res = await Api.update(id, data);
    dispatch({
      type: UPDATE_TUTORIAL,
      payload: res.data
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteTutorial = (id) => async (dispatch) => {
  try {
    const res = await Api.delete(id);
    dispatch({
      type: DELETE_TUTORIAL,
      payload: res.data
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteTutorials = () => async (dispatch) => {
  try {
    const res = await Api.deleteAll();
    dispatch({
      type: DELETE_ALL_TUTORIALS,
      payload: res.data
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const findTutorialsByKeyWord = (keyWord) => async (dispatch) => {
  try {
    const res = await Api.findByKeyWord(keyWord);
    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: res.data
    })
    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}
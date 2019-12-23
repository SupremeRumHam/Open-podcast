import {
  SET_UPDATES, 
  LOADING_DATA, 
  LIKE_UPDATE, 
  UNLIKE_UPDATE, 
  DELETE_UPDATE, 
  LOADING_UI, 
  CLEAR_ERRORS, 
  SET_ERRORS,
  POST_UPDATE,
  SET_UPDATE,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

export const getUpdates = () => (dispatch) => {
  dispatch({ type: LOADING_DATA});
  axios.get('/updates')
  .then((res) => {
    dispatch({
      type: SET_UPDATES,
      payload: res.data
    });
  })
  .catch((err) => {
    dispatch({
      type: SET_UPDATES,
      payload: []
    });
  });
};

export const getUpdate = (updatesId) => (dispatch) => {
  dispatch({ type: LOADING_UI});
  axios.get(`/update/${updatesId}`)
  .then((res) => {
    dispatch({
      type: SET_UPDATE,
      payload: res.data
    });
    dispatch({ type: STOP_LOADING_UI});
  })
  .catch((err) => console.log(err));
};

export const postUpdate = (newUpdate) => (dispatch) => {
  dispatch({ type: LOADING_UI});
  axios.post('/update', newUpdate)
  .then((res) => {
    dispatch({
      type: POST_UPDATE,
      payload: res.data
    });
    dispatch(clearErrors());
  })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const likeUpdate = (updatesId) => (dispatch) => {
  axios.get(`/update/${updatesId}/like`)
  .then((res) =>  {
    dispatch({
      type: LIKE_UPDATE,
      payload: res.data
    });
  })
  .catch((err) => console.log(err));
};

export const unlikeUpdate = (updatesId) => (dispatch) => {
  axios.get(`/update/${updatesId}/unlike`)
  .then((res) =>  {
    dispatch({
      type: UNLIKE_UPDATE,
      payload: res.data
    });
  })
  .catch((err) => console.log(err));
};

export const submitComment = (updatesId, commentData) => (dispatch) => {
  axios.post(`/update/${updatesId}/comment`, commentData)
  .then((res) => {
    dispatch({
      type: SUBMIT_COMMENT,
      payload: res.data
    });
    dispatch(clearErrors());
  })
  .catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  });
};

export const deleteUpdate = (updatesId) => (dispatch) => {
  axios.delete(`/update/${updatesId}`)
  .then(() => {
    dispatch({
      types: DELETE_UPDATE, payload: updatesId})
  })
  .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA});
  axios.get(`/user/${userHandle}`)
  .then((res) => {
    dispatch({
      type: SET_UPDATES,
      payload: res.data.updates
    });
  })
  .catch(() => {
    dispatch({
      type: SET_UPDATES,
      payload: null
    });
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS});
};
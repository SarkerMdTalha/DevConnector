import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';


//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

//Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {

                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history('/dashboard');
        }

    } catch (err) {
        // safe handling when err.response may not exist (e.g. thrown by calling undefined history)
        const errors = err.response && err.response.data && err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response ? err.response.statusText : err.message,
                status: err.response ? err.response.status : 'NETWORK_ERROR'
            }
        });
    }
}


// Add experience

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {

                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));
        history('/dashboard');

    } catch (err) {
        console.error('addExperience thunk error', err);
        const errors = err.response && err.response.data && err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        } else {
            // if we get here there's no validation errors from server,
            // show something so user knows what happened
            dispatch(setAlert(err.message || 'Unexpected error', 'danger'));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response ? err.response.statusText : err.message,
                status: err.response ? err.response.status : 'NETWORK_ERROR'
            }
        });
    }
}


// Add Education

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {

                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));
        history('/dashboard');

    } catch (err) {
        console.error('addEducation thunk error', err);
        const errors = err.response && err.response.data && err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response ? err.response.statusText : err.message,
                status: err.response ? err.response.status : 'NETWORK_ERROR'
            }
        });
    }
}
import axios from 'axios';
import { setAlert } from './alert';
import { DELETE_ACCOUNT, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILES } from './types';


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
};


// Delete experience

export const deleteExperience = id => async dispatch => {
    try {

        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response ? err.response.statusText : err.message,
                status: err.response ? err.response.status : null
            }
        });

    }
}

// Delete education

export const deleteEducation = id => async dispatch => {
    try {

        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response ? err.response.statusText : err.message,
                status: err.response ? err.response.status : null
            }
        });

    }
};

//Delete account and profile


export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {

            const res = await axios.delete('/api/profile/');

            dispatch({
                type: CLEAR_PROFILES
            });

            dispatch({
                type: DELETE_ACCOUNT
            });

            dispatch(setAlert('Account Deleted', 'success'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response ? err.response.statusText : err.message,
                    status: err.response ? err.response.status : null
                }
            });

        }

    }

};

//Get all profiles

export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILES });
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response ? err.response.statusText : err.message,
                status: err.response ? err.response.status : null
            }
        });

    }
}



//Get profile by id

export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response ? err.response.statusText : err.message,
                status: err.response ? err.response.status : null
            }
        });

    }
}
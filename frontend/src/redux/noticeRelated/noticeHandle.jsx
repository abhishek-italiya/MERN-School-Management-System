import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './noticeSlice';

export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const updateNoticeFields = (id, fields) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/Notice/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        return result.data;
    } catch (error) {
        dispatch(getError(error));
    }
}

export const deleteNoticeItem = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/Notice/${id}`);
        return result.data;
    } catch (error) {
        dispatch(getError(error));
    }
}

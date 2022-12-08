import axios from 'axios';
import {
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
  STORE_LIST_FAIL,
  STORE_DETAILS_REQUEST,
  STORE_DETAILS_SUCCESS,
  STORE_DETAILS_FAIL,
  STORE_DELETE_SUCCESS,
  STORE_DELETE_REQUEST,
  STORE_DELETE_FAIL,
  STORE_CREATE_REQUEST,
  STORE_CREATE_SUCCESS,
  STORE_CREATE_FAIL,
  STORE_UPDATE_REQUEST,
  STORE_UPDATE_SUCCESS,
  STORE_UPDATE_FAIL,
  STORE_CREATE_REVIEW_REQUEST,
  STORE_CREATE_REVIEW_SUCCESS,
  STORE_CREATE_REVIEW_FAIL,
  STORE_TOP_REQUEST,
  STORE_TOP_SUCCESS,
  STORE_TOP_FAIL
} from '../constants/storeConstants'
import { logout } from './adminActions'

export const listStores = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: STORE_LIST_REQUEST });

    const { data } = await axios.get(`/api/stores?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: STORE_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: STORE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}


export const listStoreDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STORE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/astores/${id}`);

    dispatch({
      type: STORE_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: STORE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}

export const deleteStore = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_DELETE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    await axios.delete(`/api/astores/${id}`, config)

    dispatch({
      type: STORE_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STORE_DELETE_FAIL,
      payload: message
    })
  }
}

export const createStore = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_CREATE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/astores`, {}, config)

    dispatch({
      type: STORE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STORE_CREATE_FAIL,
      payload: message
    })
  }
}
export const updateStore = (store) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_UPDATE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/astores/${store._id}`,
      store,
      config
    )

    dispatch({
      type: STORE_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: STORE_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STORE_UPDATE_FAIL,
      payload: message
    })
  }
}

export const createStoreReview = (storeId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: STORE_CREATE_REVIEW_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    await axios.post(`/api/astores/${storeId}/reviews`, review, config)

    dispatch({
      type: STORE_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: STORE_CREATE_REVIEW_FAIL,
      payload: message
    })
  }
}

export const listTopStores = () => async (dispatch) => {
  try {
    dispatch({ type: STORE_TOP_REQUEST });

    const { data } = await axios.get(`/api/astores/top`);

    dispatch({
      type: STORE_TOP_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: STORE_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}
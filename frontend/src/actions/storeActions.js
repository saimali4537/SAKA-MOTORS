import axios from 'axios';
import {
  STORE_DETAILS_SUCCESS,
  STORE_DELETE_SUCCESS,
  STORE_DELETE_REQUEST,
  STORE_DETAILS_REQUEST,
  STORE_DETAILS_FAIL,
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
  STORE_LIST_MY_REQUEST,
  STORE_LIST_MY_SUCCESS,
  STORE_LIST_MY_FAIL,
} from '../constants/storeConstants'
import { logout1 } from './managerActions'

export const createStore1 = (store) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_CREATE_REQUEST,
    })

    const {
      managerLogin: { managerInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${managerInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/stores/add`, store, config)

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
      dispatch(logout1())
    }
    dispatch({
      type: STORE_CREATE_FAIL,
      payload: message
    })
  }
}

export const listMyStores = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_LIST_MY_REQUEST,
    })

    const {
      managerLogin: { managerInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${managerInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/stores/mystores`, config)

    dispatch({
      type: STORE_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: STORE_LIST_MY_FAIL,
      payload: message
    })
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
export const createStore = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_CREATE_REQUEST,
    })

    const {
      managerLogin: { managerInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${managerInfo.token}`,
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
      dispatch(logout1())
    }
    dispatch({
      type: STORE_CREATE_FAIL,
      payload: message
    })
  }
}
export const deleteStore = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_DELETE_REQUEST,
    })

    const {
      managerLogin: { managerInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${managerInfo.token}`,
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
      dispatch(logout1())
    }
    dispatch({
      type: STORE_DELETE_FAIL,
      payload: message
    })
  }
}

export const updateStore1 = (store) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STORE_UPDATE_REQUEST,
    })

    const {
      managerLogin: { managerInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${managerInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/stores/${store._id}`,
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
      dispatch(logout1())
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
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/stores/${storeId}/reviews`, review, config)

    dispatch({
      type: STORE_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: STORE_CREATE_REVIEW_FAIL,
      payload: message
    })
  }
}

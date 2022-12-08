import axios from 'axios';
import {
  MECHANIC_LIST_REQUEST,
  MECHANIC_LIST_SUCCESS,
  MECHANIC_LIST_FAIL,
  MECHANIC_S_LIST_REQUEST,
  MECHANIC_S_LIST_SUCCESS,
  MECHANIC_S_LIST_FAIL,
  MECHANIC_DETAILS_REQUEST,
  MECHANIC_DETAILS_SUCCESS,
  MECHANIC_DETAILS_FAIL,
  MECHANIC_DELETE_SUCCESS,
  MECHANIC_DELETE_REQUEST,
  MECHANIC_DELETE_FAIL,
  MECHANIC_CREATE_REQUEST,
  MECHANIC_CREATE_SUCCESS,
  MECHANIC_CREATE_FAIL,
  MECHANIC_UPDATE_REQUEST,
  MECHANIC_UPDATE_SUCCESS,
  MECHANIC_UPDATE_FAIL,
  MECHANIC_CREATE_REVIEW_REQUEST,
  MECHANIC_CREATE_REVIEW_SUCCESS,
  MECHANIC_CREATE_REVIEW_FAIL,
  MECHANIC_TOP_REQUEST,
  MECHANIC_TOP_SUCCESS,
  MECHANIC_TOP_FAIL
} from '../constants/mechanicConstants'
import { logout } from './adminActions'

export const listMechanics = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: MECHANIC_LIST_REQUEST });

    const { data } = await axios.get(`/api/amechanics?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: MECHANIC_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MECHANIC_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}
export const listSMechanics = (keyword = '', pageNumber = '', id) => async (dispatch) => {
  try {
    dispatch({ type: MECHANIC_S_LIST_REQUEST });

    const { data } = await axios.get(`/api/amechanics/sadmins/${id}/?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: MECHANIC_S_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MECHANIC_S_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}

export const listMechanicDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MECHANIC_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/amechanics/${id}`);

    dispatch({
      type: MECHANIC_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MECHANIC_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}

export const deleteMechanic = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MECHANIC_DELETE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    await axios.delete(`/api/amechanics/${id}`, config)

    dispatch({
      type: MECHANIC_DELETE_SUCCESS,
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
      type: MECHANIC_DELETE_FAIL,
      payload: message
    })
  }
}

export const createMechanic = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MECHANIC_CREATE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    const { data } = await axios.admin(`/api/amechanics`, {}, config)

    dispatch({
      type: MECHANIC_CREATE_SUCCESS,
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
      type: MECHANIC_CREATE_FAIL,
      payload: message
    })
  }
}

export const updateMechanic = (mechanic) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MECHANIC_UPDATE_REQUEST,
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
      `/api/amechanics/${mechanic._id}`,
      mechanic,
      config
    )

    dispatch({
      type: MECHANIC_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: MECHANIC_DETAILS_SUCCESS,
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
      type: MECHANIC_UPDATE_FAIL,
      payload: message
    })
  }
}

export const createMechanicReview = (adminId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: MECHANIC_CREATE_REVIEW_REQUEST,
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

    await axios.admin(`/api/amechanics/${adminId}/reviews`, review, config)

    dispatch({
      type: MECHANIC_CREATE_REVIEW_SUCCESS,
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
      type: MECHANIC_CREATE_REVIEW_FAIL,
      payload: message
    })
  }
}

export const listTopMechanics = () => async (dispatch) => {
  try {
    dispatch({ type: MECHANIC_TOP_REQUEST });

    const { data } = await axios.get(`/api/amechanics/top`);

    dispatch({
      type: MECHANIC_TOP_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MECHANIC_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}
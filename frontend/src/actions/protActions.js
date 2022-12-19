import axios from 'axios';
import {
  PROT_LIST_REQUEST,
  PROT_LIST_SUCCESS,
  PROT_LIST_FAIL,
  PROT_DETAILS_REQUEST,
  PROT_DETAILS_SUCCESS,
  PROT_DETAILS_FAIL,
  PROT_DELETE_SUCCESS,
  PROT_DELETE_REQUEST,
  PROT_DELETE_FAIL,
  PROT_CREATE_REQUEST,
  PROT_CREATE_SUCCESS,
  PROT_CREATE_FAIL,
  PROT_UPDATE_REQUEST,
  PROT_UPDATE_SUCCESS,
  PROT_UPDATE_FAIL,
  PROT_CREATE_REVIEW_REQUEST,
  PROT_CREATE_REVIEW_SUCCESS,
  PROT_CREATE_REVIEW_FAIL,
  PROT_TOP_REQUEST,
  PROT_TOP_SUCCESS,
  PROT_TOP_FAIL,
  PROT_LIST_MY_REQUEST,
  PROT_LIST_MY_SUCCESS,
  PROT_LIST_MY_FAIL,
} from '../constants/protConstants'
import { logout1 } from './mechanicActions'

export const listProts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: PROT_LIST_REQUEST });

    const { data } = await axios.get(`/api/prots?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: PROT_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PROT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}
export const listMyProts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROT_LIST_MY_REQUEST,
    })

    const {
      mechanicLogin: { mechanicInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${mechanicInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/prots/myprots`, config)

    dispatch({
      type: PROT_LIST_MY_SUCCESS,
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
      type: PROT_LIST_MY_FAIL,
      payload: message
    })
  }
}

export const listProtDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/prots/${id}`);

    dispatch({
      type: PROT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PROT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}

export const deleteProt = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROT_DELETE_REQUEST,
    })

    const {
      mechanicLogin: { mechanicInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${mechanicInfo.token}`,
      },
    }

    await axios.delete(`/api/prots/${id}`, config)

    dispatch({
      type: PROT_DELETE_SUCCESS,
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
      type: PROT_DELETE_FAIL,
      payload: message
    })
  }
}

export const createProt = (prot) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROT_CREATE_REQUEST,
    })

    const {
      mechanicLogin: { mechanicInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${mechanicInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/prots/add`, prot, config)

    dispatch({
      type: PROT_CREATE_SUCCESS,
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
      type: PROT_CREATE_FAIL,
      payload: message
    })
  }
}

export const updateProt = (prot) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROT_UPDATE_REQUEST,
    })

    const {
      mechanicLogin: { mechanicInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mechanicInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/prots/${prot._id}`,
      prot,
      config
    )

    dispatch({
      type: PROT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: PROT_DETAILS_SUCCESS,
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
      type: PROT_UPDATE_FAIL,
      payload: message
    })
  }
}

export const createProtReview = (protId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PROT_CREATE_REVIEW_REQUEST,
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

    await axios.post(`/api/prots/${protId}/reviews`, review, config)

    dispatch({
      type: PROT_CREATE_REVIEW_SUCCESS,
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
      type: PROT_CREATE_REVIEW_FAIL,
      payload: message
    })
  }
}

export const listTopProts = () => async (dispatch) => {
  try {
    dispatch({ type: PROT_TOP_REQUEST });

    const { data } = await axios.get(`/api/prots/top`);

    dispatch({
      type: PROT_TOP_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PROT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}
import axios from 'axios';
import {
  OVERVIEW_LIST_REQUEST,
  OVERVIEW_LIST_SUCCESS,
  OVERVIEW_LIST_FAIL,
  OVERVIEW_CREATE_REQUEST,
  OVERVIEW_CREATE_SUCCESS,
  OVERVIEW_CREATE_FAIL,
  OVERVIEW_UPDATE_REQUEST,
  OVERVIEW_UPDATE_SUCCESS,
  OVERVIEW_UPDATE_FAIL,
} from '../constants/overviewConstants'
import { logout } from './adminActions'

export const listOverviews = () => async (dispatch) => {
  try {
    dispatch({ type: OVERVIEW_LIST_REQUEST });

    const { data } = await axios.get(`/api/overviews`);

    dispatch({
      type: OVERVIEW_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: OVERVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}

export const createOverview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OVERVIEW_CREATE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/overviews/${id}`, {}, config)

    dispatch({
      type: OVERVIEW_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log('You already overview on this Post')
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: OVERVIEW_CREATE_FAIL,
      payload: message
    })
  }
}

export const updateOverview = (overview) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OVERVIEW_UPDATE_REQUEST,
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
      `/api/overviews/638a3b3c4742af0f9cfabaef`,
      overview,
      config
    )

    dispatch({
      type: OVERVIEW_UPDATE_SUCCESS,
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
      type: OVERVIEW_UPDATE_FAIL,
      payload: message
    })
  }
}
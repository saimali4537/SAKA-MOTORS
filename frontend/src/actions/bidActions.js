import axios from 'axios';
import {
  BID_LIST_REQUEST,
  BID_LIST_SUCCESS,
  BID_LIST_FAIL,
  BID_S_LIST_REQUEST,
  BID_S_LIST_SUCCESS,
  BID_S_LIST_FAIL,
  BID_DETAILS_REQUEST,
  BID_DETAILS_SUCCESS,
  BID_DETAILS_FAIL,
  BID_DELETE_SUCCESS,
  BID_DELETE_REQUEST,
  BID_DELETE_FAIL,
  BID_CREATE_REQUEST,
  BID_CREATE_SUCCESS,
  BID_CREATE_FAIL,
  BID_UPDATE_REQUEST,
  BID_UPDATE_SUCCESS,
  BID_UPDATE_FAIL,
  BID_CREATE_REVIEW_REQUEST,
  BID_CREATE_REVIEW_SUCCESS,
  BID_CREATE_REVIEW_FAIL,
  BID_TOP_REQUEST,
  BID_TOP_SUCCESS,
  BID_TOP_FAIL,
  BID_LIST_MY_REQUEST,
  BID_LIST_MY_SUCCESS,
  BID_LIST_MY_FAIL,
  BID_LIST_M_REQUEST,
  BID_LIST_M_SUCCESS,
  BID_LIST_M_FAIL,
} from '../constants/bidConstants'
import { logout } from './userActions'

export const listBids = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: BID_LIST_REQUEST });

    const { data } = await axios.get(`/api/bids?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: BID_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: BID_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}
export const listSBids = (keyword = '', pageNumber = '', id) => async (dispatch) => {
  try {
    dispatch({ type: BID_S_LIST_REQUEST });

    const { data } = await axios.get(`/api/bids/sbids/${id}/?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: BID_S_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: BID_S_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}
export const listMyBids = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BID_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/bids/mybids`, config)

    dispatch({
      type: BID_LIST_MY_SUCCESS,
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
      type: BID_LIST_MY_FAIL,
      payload: message
    })
  }
}
export const listMBids = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BID_LIST_M_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/bids/mbids`, config)

    dispatch({
      type: BID_LIST_M_SUCCESS,
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
      type: BID_LIST_M_FAIL,
      payload: message
    })
  }
}

export const listBidDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BID_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/bids/${id}`);

    dispatch({
      type: BID_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: BID_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}

export const deleteBid = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BID_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/bids/${id}`, config)

    dispatch({
      type: BID_DELETE_SUCCESS,
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
      type: BID_DELETE_FAIL,
      payload: message
    })
  }
}

export const createBid = (id, bid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BID_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/bids/add/${id}`, bid, config)

    dispatch({
      type: BID_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log('You already bid on this Post')
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
  alert("You already bid on this Post")

    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BID_CREATE_FAIL,
      payload: message
    })
  }
}

export const updateBid = (bid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BID_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/bids/${bid._id}`,
      bid,
      config
    )

    dispatch({
      type: BID_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: BID_DETAILS_SUCCESS,
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
      type: BID_UPDATE_FAIL,
      payload: message
    })
  }
}

export const createBidReview = (bidId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BID_CREATE_REVIEW_REQUEST,
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

    await axios.post(`/api/bids/${bidId}/reviews`, review, config)

    dispatch({
      type: BID_CREATE_REVIEW_SUCCESS,
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
      type: BID_CREATE_REVIEW_FAIL,
      payload: message
    })
  }
}

export const listTopBids = (id) => async (dispatch) => {
  try {
    dispatch({ type: BID_TOP_REQUEST });

    const { data } = await axios.get(`/api/bids/top/${id}`);

    dispatch({
      type: BID_TOP_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: BID_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}
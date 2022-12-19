import axios from 'axios';
import {
  AUCTION_LIST_REQUEST,
  AUCTION_LIST_SUCCESS,
  AUCTION_LIST_FAIL,
  AUCTION_S_LIST_REQUEST,
  AUCTION_S_LIST_SUCCESS,
  AUCTION_S_LIST_FAIL,
  AUCTION_DETAILS_REQUEST,
  AUCTION_DETAILS_SUCCESS,
  AUCTION_DETAILS_FAIL,
  AUCTION_DELETE_SUCCESS,
  AUCTION_DELETE_REQUEST,
  AUCTION_DELETE_FAIL,
  AUCTION_CREATE_REQUEST,
  AUCTION_CREATE_SUCCESS,
  AUCTION_CREATE_FAIL,
  AUCTION_UPDATE_REQUEST,
  AUCTION_UPDATE_SUCCESS,
  AUCTION_UPDATE_FAIL,
  AUCTION_CREATE_REVIEW_REQUEST,
  AUCTION_CREATE_REVIEW_SUCCESS,
  AUCTION_CREATE_REVIEW_FAIL,
  AUCTION_TOP_REQUEST,
  AUCTION_TOP_SUCCESS,
  AUCTION_TOP_FAIL,
  AUCTION_LIST_MY_REQUEST,
  AUCTION_LIST_MY_SUCCESS,
  AUCTION_LIST_MY_FAIL,
} from '../constants/auctionConstants'
import { logout } from './userActions'

export const listAuctions = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: AUCTION_LIST_REQUEST });

    const { data } = await axios.get(`/api/auctions?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: AUCTION_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: AUCTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}
export const listSAuctions = (keyword = '', pageNumber = '', id) => async (dispatch) => {
  try {
    dispatch({ type: AUCTION_S_LIST_REQUEST });

    const { data } = await axios.get(`/api/auctions/sauctions/${id}/?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: AUCTION_S_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: AUCTION_S_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}
export const listMyAuctions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUCTION_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/auctions/myauctions`, config)

    dispatch({
      type: AUCTION_LIST_MY_SUCCESS,
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
      type: AUCTION_LIST_MY_FAIL,
      payload: message
    })
  }
}

export const listAuctionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: AUCTION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/auctions/${id}`);

    dispatch({
      type: AUCTION_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: AUCTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}

export const deleteAuction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUCTION_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/auctions/${id}`, config)

    dispatch({
      type: AUCTION_DELETE_SUCCESS,
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
      type: AUCTION_DELETE_FAIL,
      payload: message
    })
  }
}

export const createAuction = (auction) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUCTION_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/auctions/add`, auction, config)

    dispatch({
      type: AUCTION_CREATE_SUCCESS,
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
      type: AUCTION_CREATE_FAIL,
      payload: message
    })
  }
}

export const updateAuction = (auction) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_UPDATE_REQUEST,
    })


    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `/api/auctions/${auction._id}`,
      auction,
      config
    )

    dispatch({
      type: AUCTION_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: AUCTION_DETAILS_SUCCESS,
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
      type: AUCTION_UPDATE_FAIL,
      payload: message
    })
  }
}

export const createAuctionReview = (auctionId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: AUCTION_CREATE_REVIEW_REQUEST,
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

    await axios.auction(`/api/auctions/${auctionId}/reviews`, review, config)

    dispatch({
      type: AUCTION_CREATE_REVIEW_SUCCESS,
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
      type: AUCTION_CREATE_REVIEW_FAIL,
      payload: message
    })
  }
}

export const listTopAuctions = () => async (dispatch) => {
  try {
    dispatch({ type: AUCTION_TOP_REQUEST });

    const { data } = await axios.get(`/api/auctions/top`);

    dispatch({
      type: AUCTION_TOP_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: AUCTION_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}
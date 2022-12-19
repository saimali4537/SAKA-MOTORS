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
  BID_DELETE_REQUEST,
  BID_DELETE_SUCCESS,
  BID_DELETE_FAIL,
  BID_CREATE_RESET,
  BID_CREATE_FAIL,
  BID_CREATE_SUCCESS,
  BID_CREATE_REQUEST,
  BID_UPDATE_REQUEST,
  BID_UPDATE_SUCCESS,
  BID_UPDATE_FAIL,
  BID_UPDATE_RESET,
  BID_CREATE_REVIEW_REQUEST,
  BID_CREATE_REVIEW_SUCCESS,
  BID_CREATE_REVIEW_FAIL,
  BID_CREATE_REVIEW_RESET,
  BID_TOP_REQUEST,
  BID_TOP_SUCCESS,
  BID_TOP_FAIL,
  BID_TOP_RESET,
  BID_LIST_MY_REQUEST,
  BID_LIST_MY_SUCCESS,
  BID_LIST_MY_FAIL,
  BID_LIST_MY_RESET,
  BID_LIST_M_REQUEST,
  BID_LIST_M_SUCCESS,
  BID_LIST_M_FAIL,
  BID_LIST_M_RESET,
} from '../constants/bidConstants';

export const bidListReducer = (state = { bids: [] }, action) => {
  switch (action.type) {
    case BID_LIST_REQUEST:
      return { loading: true, bids: [] }
    case BID_LIST_SUCCESS:
      return {
        loading: false,
        bids: action.payload.bids,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case BID_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const bidSListReducer = (state = { bids: [] }, action) => {
  switch (action.type) {
    case BID_S_LIST_REQUEST:
      return {
        loading: true,
      }
    case BID_S_LIST_SUCCESS:
      return {
        loading: false,
        bids: action.payload,
      }
    case BID_S_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    
    default:
      return state
  }
}
export const bidDetailsReducer = (state = { bid: { reviews: [] } }, action) => {
  switch (action.type) {
    case BID_DETAILS_REQUEST:
      return { ...state, loading: true }
    case BID_DETAILS_SUCCESS:
      return { loading: false, bid: action.payload }
    case BID_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bidDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BID_DELETE_REQUEST:
      return { loading: true }
    case BID_DELETE_SUCCESS:
      return { loading: false, success: true }
    case BID_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bidCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BID_CREATE_REQUEST:
      return { loading: true }
    case BID_CREATE_SUCCESS:
      return { loading: false, success: true, bid: action.payload }
    case BID_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case BID_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const bidUpdateReducer = (state = { bid: {} }, action) => {
  switch (action.type) {
    case BID_UPDATE_REQUEST:
      return { loading: true }
    case BID_UPDATE_SUCCESS:
      return { loading: false, success: true, bid: action.payload }
    case BID_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case BID_UPDATE_RESET:
      return { bid: {} }
    default:
      return state
  }
}

export const bidReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BID_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case BID_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case BID_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case BID_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const bidTopRatedReducer = (state = { bids: [] }, action) => {
  switch (action.type) {
    case BID_TOP_REQUEST:
      return { loading: true, bids: [] }
    case BID_TOP_SUCCESS:
      return { loading: false, bids: action.payload }
    case BID_TOP_FAIL:
      return { loading: false, error: action.payload }
    case BID_TOP_RESET:
      return {}
    default:
      return state
  }
}

export const bidListMyReducer = (state = { bids: [] }, action) => {
  switch (action.type) {
    case BID_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case BID_LIST_MY_SUCCESS:
      return {
        loading: false,
        bids: action.payload,
      }
    case BID_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case BID_LIST_MY_RESET:
      return { bids: [] }
    default:
      return state
  }
}
export const bidListMReducer = (state = { bids: [] }, action) => {
  switch (action.type) {
    case BID_LIST_M_REQUEST:
      return {
        loading: true,
      }
    case BID_LIST_M_SUCCESS:
      return {
        loading: false,
        bids: action.payload,
      }
    case BID_LIST_M_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case BID_LIST_M_RESET:
      return { bids: [] }
    default:
      return state
  }
}
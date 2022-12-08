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
  AUCTION_DELETE_REQUEST,
  AUCTION_DELETE_SUCCESS,
  AUCTION_DELETE_FAIL,
  AUCTION_CREATE_RESET,
  AUCTION_CREATE_FAIL,
  AUCTION_CREATE_SUCCESS,
  AUCTION_CREATE_REQUEST,
  AUCTION_UPDATE_REQUEST,
  AUCTION_UPDATE_SUCCESS,
  AUCTION_UPDATE_FAIL,
  AUCTION_UPDATE_RESET,
  AUCTION_CREATE_REVIEW_REQUEST,
  AUCTION_CREATE_REVIEW_SUCCESS,
  AUCTION_CREATE_REVIEW_FAIL,
  AUCTION_CREATE_REVIEW_RESET,
  AUCTION_TOP_REQUEST,
  AUCTION_TOP_SUCCESS,
  AUCTION_TOP_FAIL,
  AUCTION_TOP_RESET,
  AUCTION_LIST_MY_REQUEST,
  AUCTION_LIST_MY_SUCCESS,
  AUCTION_LIST_MY_FAIL,
  AUCTION_LIST_MY_RESET,
} from '../constants/auctionConstants';

export const auctionListReducer = (state = { auctions: [] }, action) => {
  switch (action.type) {
    case AUCTION_LIST_REQUEST:
      return { loading: true, auctions: [] }
    case AUCTION_LIST_SUCCESS:
      return {
        loading: false,
        auctions: action.payload.auctions,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case AUCTION_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const auctionSListReducer = (state = { auctions: [] }, action) => {
  switch (action.type) {
    case AUCTION_S_LIST_REQUEST:
      return {
        loading: true,
      }
    case AUCTION_S_LIST_SUCCESS:
      return {
        loading: false,
        auctions: action.payload,
      }
    case AUCTION_S_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    
    default:
      return state
  }
}
export const auctionDetailsReducer = (state = { auction: { reviews: [] } }, action) => {
  switch (action.type) {
    case AUCTION_DETAILS_REQUEST:
      return { ...state, loading: true }
    case AUCTION_DETAILS_SUCCESS:
      return { loading: false, auction: action.payload }
    case AUCTION_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const auctionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AUCTION_DELETE_REQUEST:
      return { loading: true }
    case AUCTION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case AUCTION_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const auctionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case AUCTION_CREATE_REQUEST:
      return { loading: true }
    case AUCTION_CREATE_SUCCESS:
      return { loading: false, success: true, auction: action.payload }
    case AUCTION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case AUCTION_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const auctionUpdateReducer = (state = { auction: {} }, action) => {
  switch (action.type) {
    case AUCTION_UPDATE_REQUEST:
      return { loading: true }
    case AUCTION_UPDATE_SUCCESS:
      return { loading: false, success: true, auction: action.payload }
    case AUCTION_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case AUCTION_UPDATE_RESET:
      return { auction: {} }
    default:
      return state
  }
}

export const auctionReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case AUCTION_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case AUCTION_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case AUCTION_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case AUCTION_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const auctionTopRatedReducer = (state = { auctions: [] }, action) => {
  switch (action.type) {
    case AUCTION_TOP_REQUEST:
      return { loading: true, auctions: [] }
    case AUCTION_TOP_SUCCESS:
      return { loading: false, auctions: action.payload }
    case AUCTION_TOP_FAIL:
      return { loading: false, error: action.payload }
    case AUCTION_TOP_RESET:
      return {}
    default:
      return state
  }
}

export const auctionListMyReducer = (state = { auctions: [] }, action) => {
  switch (action.type) {
    case AUCTION_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case AUCTION_LIST_MY_SUCCESS:
      return {
        loading: false,
        auctions: action.payload,
      }
    case AUCTION_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case AUCTION_LIST_MY_RESET:
      return { auctions: [] }
    default:
      return state
  }
}
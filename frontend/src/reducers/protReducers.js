import {
  PROT_LIST_REQUEST,
  PROT_LIST_SUCCESS,
  PROT_LIST_FAIL,
  PROT_S_LIST_REQUEST,
  PROT_S_LIST_SUCCESS,
  PROT_S_LIST_FAIL,
  PROT_DETAILS_REQUEST,
  PROT_DETAILS_SUCCESS,
  PROT_DETAILS_FAIL,
  PROT_DELETE_REQUEST,
  PROT_DELETE_SUCCESS,
  PROT_DELETE_FAIL,
  PROT_CREATE_RESET,
  PROT_CREATE_FAIL,
  PROT_CREATE_SUCCESS,
  PROT_CREATE_REQUEST,
  PROT_UPDATE_REQUEST,
  PROT_UPDATE_SUCCESS,
  PROT_UPDATE_FAIL,
  PROT_UPDATE_RESET,
  PROT_CREATE_REVIEW_REQUEST,
  PROT_CREATE_REVIEW_SUCCESS,
  PROT_CREATE_REVIEW_FAIL,
  PROT_CREATE_REVIEW_RESET,
  PROT_TOP_REQUEST,
  PROT_TOP_SUCCESS,
  PROT_TOP_FAIL,
  PROT_TOP_RESET,
  PROT_LIST_MY_REQUEST,
  PROT_LIST_MY_SUCCESS,
  PROT_LIST_MY_FAIL,
  PROT_LIST_MY_RESET,
} from '../constants/protConstants';

export const protListReducer = (state = { prots: [] }, action) => {
  switch (action.type) {
    case PROT_LIST_REQUEST:
      return { loading: true, prots: [] }
    case PROT_LIST_SUCCESS:
      return {
        loading: false,
        prots: action.payload.prots,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case PROT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const protSListReducer = (state = { prots: [] }, action) => {
  switch (action.type) {
    case PROT_S_LIST_REQUEST:
      return {
        loading: true,
      }
    case PROT_S_LIST_SUCCESS:
      return {
        loading: false,
        prots: action.payload,
      }
    case PROT_S_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    
    default:
      return state
  }
}
export const protDetailsReducer = (state = { prot: { reviews: [] } }, action) => {
  switch (action.type) {
    case PROT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PROT_DETAILS_SUCCESS:
      return { loading: false, prot: action.payload }
    case PROT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const protDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROT_DELETE_REQUEST:
      return { loading: true }
    case PROT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PROT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const protCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROT_CREATE_REQUEST:
      return { loading: true }
    case PROT_CREATE_SUCCESS:
      return { loading: false, success: true, prot: action.payload }
    case PROT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PROT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const protUpdateReducer = (state = { prot: {} }, action) => {
  switch (action.type) {
    case PROT_UPDATE_REQUEST:
      return { loading: true }
    case PROT_UPDATE_SUCCESS:
      return { loading: false, success: true, prot: action.payload }
    case PROT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PROT_UPDATE_RESET:
      return { prot: {} }
    default:
      return state
  }
}

export const protReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PROT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PROT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PROT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const protTopRatedReducer = (state = { prots: [] }, action) => {
  switch (action.type) {
    case PROT_TOP_REQUEST:
      return { loading: true, prots: [] }
    case PROT_TOP_SUCCESS:
      return { loading: false, prots: action.payload }
    case PROT_TOP_FAIL:
      return { loading: false, error: action.payload }
    case PROT_TOP_RESET:
      return {}
    default:
      return state
  }
}

export const protListMyReducer = (state = { prots: [] }, action) => {
  switch (action.type) {
    case PROT_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case PROT_LIST_MY_SUCCESS:
      return {
        loading: false,
        prots: action.payload,
      }
    case PROT_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PROT_LIST_MY_RESET:
      return { prots: [] }
    default:
      return state
  }
}
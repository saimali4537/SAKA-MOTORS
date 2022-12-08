import {
  OVERVIEW_LIST_REQUEST,
  OVERVIEW_LIST_SUCCESS,
  OVERVIEW_LIST_FAIL,
  OVERVIEW_DETAILS_SUCCESS,
  OVERVIEW_CREATE_RESET,
  OVERVIEW_CREATE_FAIL,
  OVERVIEW_CREATE_SUCCESS,
  OVERVIEW_CREATE_REQUEST,
  OVERVIEW_UPDATE_REQUEST,
  OVERVIEW_UPDATE_SUCCESS,
  OVERVIEW_UPDATE_FAIL,
  OVERVIEW_UPDATE_RESET,
} from '../constants/overviewConstants';

export const overviewListReducer = (state = { overviews: [] }, action) => {
  switch (action.type) {
    case OVERVIEW_LIST_REQUEST:
      return { loading: true, overviews: [] }
    case OVERVIEW_LIST_SUCCESS:
      return {
        loading: false,
        overviews: action.payload.overviews,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case OVERVIEW_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const overviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case OVERVIEW_CREATE_REQUEST:
      return { loading: true }
    case OVERVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, overview: action.payload }
    case OVERVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case OVERVIEW_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const overviewUpdateReducer = (state = { overview: {} }, action) => {
  switch (action.type) {
    case OVERVIEW_UPDATE_REQUEST:
      return { loading: true }
    case OVERVIEW_UPDATE_SUCCESS:
      return { loading: false, success: true, overview: action.payload }
    case OVERVIEW_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case OVERVIEW_UPDATE_RESET:
      return { overview: {} }
    default:
      return state
  }
}
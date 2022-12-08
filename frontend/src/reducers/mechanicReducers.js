import {
  MECHANIC_LOGIN_FAIL,
  MECHANIC_LOGIN_REQUEST,
  MECHANIC_LOGIN_SUCCESS,
  MECHANIC_LOGOUT,
  MECHANIC_REGISTER_FAIL,
  MECHANIC_REGISTER_REQUEST,
  MECHANIC_REGISTER_SUCCESS,
  MECHANIC_DETAILS_REQUEST,
  MECHANIC_DETAILS_SUCCESS,
  MECHANIC_DETAILS_FAIL,
  MECHANIC_DETAILS_RESET,
  MECHANIC_LIST_REQUEST,
  MECHANIC_LIST_SUCCESS,
  MECHANIC_LIST_FAIL,
  MECHANIC_LIST_RESET,
  MECHANIC_UPDATE_PROFILE_REQUEST,
  MECHANIC_UPDATE_PROFILE_SUCCESS,
  MECHANIC_UPDATE_PROFILE_FAIL,
  MECHANIC_UPDATE_PROFILE_RESET,
  MECHANIC_DELETE_REQUEST,
  MECHANIC_DELETE_SUCCESS,
  MECHANIC_DELETE_FAIL,
  MECHANIC_UPDATE_RESET,
  MECHANIC_UPDATE_REQUEST,
  MECHANIC_UPDATE_SUCCESS,
  MECHANIC_UPDATE_FAIL,
} from '../constants/mechanicConstants'

export const mechanicLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case MECHANIC_LOGIN_REQUEST:
      return { loading: true }
    case MECHANIC_LOGIN_SUCCESS:
      return { loading: false, mechanicInfo: action.payload }
    case MECHANIC_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case MECHANIC_LOGOUT:
      return {}
    default:
      return state
  }
}

export const mechanicRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case MECHANIC_REGISTER_REQUEST:
      return { loading: true }
    case MECHANIC_REGISTER_SUCCESS:
      return { loading: false, mechanicInfo: action.payload }
    case MECHANIC_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case MECHANIC_LOGOUT:
      return {}
    default:
      return state
  }
}

export const mechanicDetailsReducer = (state = { mechanic: {} }, action) => {
  switch (action.type) {
    case MECHANIC_DETAILS_REQUEST:
      return { ...state, loading: true }
    case MECHANIC_DETAILS_SUCCESS:
      return { loading: false, mechanic: action.payload }
    case MECHANIC_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case MECHANIC_DETAILS_RESET:
      return { mechanic: {} }
    default:
      return state
  }
}

export const mechanicUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case MECHANIC_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case MECHANIC_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, mechanicInfo: action.payload }
    case MECHANIC_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case MECHANIC_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const mechanicListReducer = (state = { mechanics: [] }, action) => {
  switch (action.type) {
    case MECHANIC_LIST_REQUEST:
      return { loading: true }
    case MECHANIC_LIST_SUCCESS:
      return { loading: false, mechanics: action.payload }
    case MECHANIC_LIST_FAIL:
      return { loading: false, error: action.payload }
    case MECHANIC_LIST_RESET:
      return { mechanics: [] }
    default:
      return state
  }
}

export const mechanicDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MECHANIC_DELETE_REQUEST:
      return { loading: true }
    case MECHANIC_DELETE_SUCCESS:
      return { loading: false, success: true }
    case MECHANIC_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const mechanicUpdateReducer = (state = { mechanic: {} }, action) => {
  switch (action.type) {
    case MECHANIC_UPDATE_REQUEST:
      return { loading: true }
    case MECHANIC_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case MECHANIC_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case MECHANIC_UPDATE_RESET:
      return {
        mechanic: {},
      }
    default:
      return state
  }
}
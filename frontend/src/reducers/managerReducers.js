import {
  MANAGER_LOGIN_FAIL,
  MANAGER_LOGIN_REQUEST,
  MANAGER_LOGIN_SUCCESS,
  MANAGER_LOGOUT,
  MANAGER_REGISTER_FAIL,
  MANAGER_REGISTER_REQUEST,
  MANAGER_REGISTER_SUCCESS,
  MANAGER_DETAILS_REQUEST,
  MANAGER_DETAILS_SUCCESS,
  MANAGER_DETAILS_FAIL,
  MANAGER_DETAILS_RESET,
  MANAGER_LIST_REQUEST,
  MANAGER_LIST_SUCCESS,
  MANAGER_LIST_FAIL,
  MANAGER_LIST_RESET,
  MANAGER_UPDATE_PROFILE_REQUEST,
  MANAGER_UPDATE_PROFILE_SUCCESS,
  MANAGER_UPDATE_PROFILE_FAIL,
  MANAGER_UPDATE_PROFILE_RESET,
  MANAGER_DELETE_REQUEST,
  MANAGER_DELETE_SUCCESS,
  MANAGER_DELETE_FAIL,
  MANAGER_UPDATE_RESET,
  MANAGER_UPDATE_REQUEST,
  MANAGER_UPDATE_SUCCESS,
  MANAGER_UPDATE_FAIL,
} from '../constants/managerConstants'

export const managerLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case MANAGER_LOGIN_REQUEST:
      return { loading: true }
    case MANAGER_LOGIN_SUCCESS:
      return { loading: false, managerInfo: action.payload }
    case MANAGER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case MANAGER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const managerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case MANAGER_REGISTER_REQUEST:
      return { loading: true }
    case MANAGER_REGISTER_SUCCESS:
      return { loading: false, managerInfo: action.payload }
    case MANAGER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case MANAGER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const managerDetailsReducer = (state = { manager: {} }, action) => {
  switch (action.type) {
    case MANAGER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case MANAGER_DETAILS_SUCCESS:
      return { loading: false, manager: action.payload }
    case MANAGER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case MANAGER_DETAILS_RESET:
      return { manager: {} }
    default:
      return state
  }
}

export const managerUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case MANAGER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case MANAGER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, managerInfo: action.payload }
    case MANAGER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case MANAGER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const managerListReducer = (state = { managers: [] }, action) => {
  switch (action.type) {
    case MANAGER_LIST_REQUEST:
      return { loading: true }
    case MANAGER_LIST_SUCCESS:
      return { loading: false, managers: action.payload }
    case MANAGER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case MANAGER_LIST_RESET:
      return { managers: [] }
    default:
      return state
  }
}

export const managerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MANAGER_DELETE_REQUEST:
      return { loading: true }
    case MANAGER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case MANAGER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const managerUpdateReducer = (state = { manager: {} }, action) => {
  switch (action.type) {
    case MANAGER_UPDATE_REQUEST:
      return { loading: true }
    case MANAGER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case MANAGER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case MANAGER_UPDATE_RESET:
      return {
        manager: {},
      }
    default:
      return state
  }
}
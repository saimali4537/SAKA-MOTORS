import axios from 'axios'
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
  MANAGER_UPDATE_PROFILE_REQUEST,
  MANAGER_UPDATE_PROFILE_SUCCESS,
  MANAGER_UPDATE_PROFILE_FAIL,
  MANAGER_LIST_FAIL,
  MANAGER_LIST_SUCCESS,
  MANAGER_LIST_REQUEST,
  MANAGER_LIST_RESET,
  MANAGER_DELETE_REQUEST,
  MANAGER_DELETE_SUCCESS,
  MANAGER_DELETE_FAIL,
  MANAGER_UPDATE_FAIL,
  MANAGER_UPDATE_SUCCESS,
  MANAGER_UPDATE_REQUEST,
} from '../constants/managerConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: MANAGER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/managers/login',
      { email, password },
      config
    )

    dispatch({
      type: MANAGER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('managerInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: MANAGER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout1 = () => dispatch => {
  localStorage.removeItem('managerInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: MANAGER_LOGOUT })
  dispatch({ type: MANAGER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: MANAGER_LIST_RESET })
  document.location.href = '/store/loginsm'
}

export const register = (name, email, password, isAdmin) => async (dispatch) => {
  try {
    dispatch({
      type: MANAGER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/managers',
      { name, email, password, isAdmin },
      config
    )

    dispatch({
      type: MANAGER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: MANAGER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('managerInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: MANAGER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const send = (email) => async (dispatch) => {
  try {
    dispatch({
      type: MANAGER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/managers/send',
      { email},
      config
    )
    dispatch({
      type: MANAGER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('managerInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: MANAGER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const sendf = (email) => async (dispatch) => {
  try {
    dispatch({
      type: MANAGER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/managers/sendf',
      { email},
      config
    )
    dispatch({
      type: MANAGER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('managerInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: MANAGER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const auth = (otp, email) => async (dispatch) => {
  try {
    dispatch({
      type: MANAGER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/managers/log',
      { otp, email},
      config
    )
    dispatch({
      type: MANAGER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('managerInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: MANAGER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getManagerDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGER_DETAILS_REQUEST,
    })

    const { managerLogin: { managerInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${managerInfo.token}`
      },
    }

    const { data } = await axios.get(`/api/managers/${id}`, config)

    dispatch({
      type: MANAGER_DETAILS_SUCCESS,
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
      type: MANAGER_DETAILS_FAIL,
      payload: message
    })
  }
}

export const updateManagerProfile = (manager) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGER_UPDATE_PROFILE_REQUEST,
    })

    const { managerLogin: { managerInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${managerInfo.token}`
      },
    }

    const { data } = await axios.put(`/api/managers/profile`, manager, config)

    dispatch({
      type: MANAGER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })
    dispatch({
      type: MANAGER_LOGIN_SUCCESS,
      payload: data
    })
    localStorage.setItem('managerInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: MANAGER_UPDATE_PROFILE_FAIL,
      payload: message
    })
  }
}
export const updateUserProfileP = (email, password) => async (dispatch) => {
  localStorage.removeItem('managerInfo')
  dispatch({ type: MANAGER_LOGOUT })
  try {
    dispatch({
      type: MANAGER_UPDATE_PROFILE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/api/managers/profilep`, {email, password}, config)

    dispatch({
      type: MANAGER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: MANAGER_LOGIN_SUCCESS,
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
      type: MANAGER_UPDATE_PROFILE_FAIL,
      payload: message
    })
  }
}


export const listManagers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGER_LIST_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/managers`, config)

    dispatch({
      type: MANAGER_LIST_SUCCESS,
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
      type: MANAGER_LIST_FAIL,
      payload: message
    })
  }
}

export const deleteManager = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGER_DELETE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    await axios.delete(`/api/managers/${id}`, config)

    dispatch({ type: MANAGER_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: MANAGER_DELETE_FAIL,
      payload: message
    })
  }
}

export const updateManager = (manager) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGER_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/managers/${manager._id}`, manager, config)

    dispatch({ type: MANAGER_UPDATE_SUCCESS })

    dispatch({ type: MANAGER_DETAILS_SUCCESS, payload: data })

    dispatch({ type: MANAGER_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: MANAGER_UPDATE_FAIL,
      payload: message
    })
  }
}
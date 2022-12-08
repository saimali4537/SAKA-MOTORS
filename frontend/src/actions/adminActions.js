import axios from 'axios'
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_DETAILS_REQUEST,
  ADMIN_DETAILS_SUCCESS,
  ADMIN_DETAILS_FAIL,
  ADMIN_DETAILS_RESET,
  ADMIN_UPDATE_PROFILE_REQUEST,
  ADMIN_UPDATE_PROFILE_SUCCESS,
  ADMIN_UPDATE_PROFILE_FAIL,
  ADMIN_LIST_FAIL,
  ADMIN_LIST_SUCCESS,
  ADMIN_LIST_REQUEST,
  ADMIN_LIST_RESET,
  ADMIN_DELETE_REQUEST,
  ADMIN_DELETE_SUCCESS,
  ADMIN_DELETE_FAIL,
  ADMIN_UPDATE_FAIL,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_REQUEST,
} from '../constants/adminConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/admins/login',
      { email, password },
      config
    )
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('adminInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const auth = (otp) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/admins/log',
      { otp},
      config
    )
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('adminInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('adminInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: ADMIN_LOGOUT })
  dispatch({ type: ADMIN_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: ADMIN_LIST_RESET })
  document.location.href = '/admin'
}

export const register = (name, email, password, isAdmin) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/admins',
      { name, email, password, isAdmin },
      config
    )

    dispatch({
      type: ADMIN_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('adminInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ADMIN_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getAdminDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_DETAILS_REQUEST,
    })

    const { adminLogin: { adminInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`
      },
    }

    const { data } = await axios.get(`/api/admins/${id}`, config)

    dispatch({
      type: ADMIN_DETAILS_SUCCESS,
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
      type: ADMIN_DETAILS_FAIL,
      payload: message
    })
  }
}

export const updateAdminProfile = (admin) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_PROFILE_REQUEST,
    })

    const { adminLogin: { adminInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`
      },
    }

    const { data } = await axios.put(`/api/admins/profile`, admin, config)

    dispatch({
      type: ADMIN_UPDATE_PROFILE_SUCCESS,
      payload: data
    })
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data
    })
    localStorage.setItem('adminInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ADMIN_UPDATE_PROFILE_FAIL,
      payload: message
    })
  }
}

export const listAdmins = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_LIST_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/admins`, config)

    dispatch({
      type: ADMIN_LIST_SUCCESS,
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
      type: ADMIN_LIST_FAIL,
      payload: message
    })
  }
}

export const deleteAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_DELETE_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    await axios.delete(`/api/admins/${id}`, config)

    dispatch({ type: ADMIN_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ADMIN_DELETE_FAIL,
      payload: message
    })
  }
}

export const updateAdmin = (admin) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/admins/${admin._id}`, admin, config)

    dispatch({ type: ADMIN_UPDATE_SUCCESS })

    dispatch({ type: ADMIN_DETAILS_SUCCESS, payload: data })

    dispatch({ type: ADMIN_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ADMIN_UPDATE_FAIL,
      payload: message
    })
  }
}
import axios from 'axios'
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
  MECHANIC_UPDATE_PROFILE_REQUEST,
  MECHANIC_UPDATE_PROFILE_SUCCESS,
  MECHANIC_UPDATE_PROFILE_FAIL,
  MECHANIC_LIST_FAIL,
  MECHANIC_LIST_SUCCESS,
  MECHANIC_LIST_REQUEST,
  MECHANIC_LIST_RESET,
  MECHANIC_DELETE_REQUEST,
  MECHANIC_DELETE_SUCCESS,
  MECHANIC_DELETE_FAIL,
  MECHANIC_UPDATE_FAIL,
  MECHANIC_UPDATE_SUCCESS,
  MECHANIC_UPDATE_REQUEST,
} from '../constants/mechanicConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: MECHANIC_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/mechanics/login',
      { email, password },
      config
    )

    dispatch({
      type: MECHANIC_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('mechanicInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: MECHANIC_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout1 = () => dispatch => {
  localStorage.removeItem('mechanicInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: MECHANIC_LOGOUT })
  dispatch({ type: MECHANIC_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: MECHANIC_LIST_RESET })
  document.location.href = '/mechanic/loginmm'
}

export const register = (name, email, password, isAdmin) => async (dispatch) => {
  try {
    dispatch({
      type: MECHANIC_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/mechanics',
      { name, email, password, isAdmin },
      config
    )

    dispatch({
      type: MECHANIC_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: MECHANIC_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('mechanicInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: MECHANIC_REGISTER_FAIL,
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
      type: MECHANIC_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/mechanics/send',
      { email},
      config
    )
    dispatch({
      type: MECHANIC_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('mechanicInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: MECHANIC_LOGIN_FAIL,
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
      type: MECHANIC_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/mechanics/sendf',
      { email},
      config
    )
    dispatch({
      type: MECHANIC_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('mechanicInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: MECHANIC_LOGIN_FAIL,
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
      type: MECHANIC_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/mechanics/log',
      { otp, email},
      config
    )
    dispatch({
      type: MECHANIC_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('mechanicInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: MECHANIC_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getMechanicDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MECHANIC_DETAILS_REQUEST,
    })

    const { mechanicLogin: { mechanicInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${mechanicInfo.token}`
      },
    }

    const { data } = await axios.get(`/api/mechanics/${id}`, config)

    dispatch({
      type: MECHANIC_DETAILS_SUCCESS,
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
      type: MECHANIC_DETAILS_FAIL,
      payload: message
    })
  }
}

export const updateMechanicProfile = (mechanic) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MECHANIC_UPDATE_PROFILE_REQUEST,
    })

    const { mechanicLogin: { mechanicInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mechanicInfo.token}`
      },
    }

    const { data } = await axios.put(`/api/mechanics/profile`, mechanic, config)

    dispatch({
      type: MECHANIC_UPDATE_PROFILE_SUCCESS,
      payload: data
    })
    dispatch({
      type: MECHANIC_LOGIN_SUCCESS,
      payload: data
    })
    localStorage.setItem('mechanicInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: MECHANIC_UPDATE_PROFILE_FAIL,
      payload: message
    })
  }
}
export const updateUserProfileP = (email, password) => async (dispatch) => {
  localStorage.removeItem('mechanicInfo')
  dispatch({ type: MECHANIC_LOGOUT })
  try {
    dispatch({
      type: MECHANIC_UPDATE_PROFILE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/api/mechanics/profilep`, {email, password}, config)

    dispatch({
      type: MECHANIC_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: MECHANIC_LOGIN_SUCCESS,
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
      type: MECHANIC_UPDATE_PROFILE_FAIL,
      payload: message
    })
  }
}

export const listMechanics = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MECHANIC_LIST_REQUEST,
    })

    const {
      mechanicLogin: { mechanicInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${mechanicInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/mechanics`, config)

    dispatch({
      type: MECHANIC_LIST_SUCCESS,
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
      type: MECHANIC_LIST_FAIL,
      payload: message
    })
  }
}

export const deleteMechanic = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MECHANIC_DELETE_REQUEST,
    })

    const {
      mechanicLogin: { mechanicInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${mechanicInfo.token}`,
      },
    }

    await axios.delete(`/api/mechanics/${id}`, config)

    dispatch({ type: MECHANIC_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: MECHANIC_DELETE_FAIL,
      payload: message
    })
  }
}

export const updateMechanic = (mechanic) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MECHANIC_UPDATE_REQUEST,
    })

    const {
      mechanicLogin: { mechanicInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mechanicInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/mechanics/${mechanic._id}`, mechanic, config)

    dispatch({ type: MECHANIC_UPDATE_SUCCESS })

    dispatch({ type: MECHANIC_DETAILS_SUCCESS, payload: data })

    dispatch({ type: MECHANIC_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout1())
    }
    dispatch({
      type: MECHANIC_UPDATE_FAIL,
      payload: message
    })
  }
}
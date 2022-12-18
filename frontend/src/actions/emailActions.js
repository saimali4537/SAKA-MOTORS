import axios from 'axios'
import {
  EMAIL_REGISTER_FAIL,
  EMAIL_REGISTER_REQUEST,
  EMAIL_REGISTER_SUCCESS,
  EMAIL_LIST_FAIL,
  EMAIL_LIST_SUCCESS,
  EMAIL_LIST_REQUEST,
} from '../constants/emailConstants'

export const emailA = (email) => async (dispatch, getState) => {
  try {
    dispatch({
      type:  EMAIL_REGISTER_REQUEST,
    })
    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    }

    const { data } = await axios.post(
      '/api/email',
      { email },
      config
    )

    dispatch({
      type: EMAIL_REGISTER_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: EMAIL_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const listEmails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMAIL_LIST_REQUEST,
    })

    const {
      adminLogin: { adminInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/email/gete`, config)

    dispatch({
      type: EMAIL_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch()
    }
    dispatch({
      type: EMAIL_LIST_FAIL,
      payload: message
    })
  }
}
import axios from 'axios';
import actions from './auth-actions';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const registerUser = credentials => async dispatch => {
  dispatch(actions.registerUserRequest());
  try {
    const response = await axios.post('/users/signup', credentials);
    token.set(response.data.token);
    // console.log('TOKEN: ', response.data.token);
    // console.log('DATA: ', response.data)
    dispatch(actions.registerUserSuccess(response.data));
  } catch (error) {
    dispatch(actions.registerUserError(error.message));
  }
};

const loginUser = credentials => async dispatch => {
  dispatch(actions.loginUserRequest());
  try {
    const response = await axios.post('/users/login', credentials);
    token.set(response.data.token);
    dispatch(actions.loginUserSuccess(response.data));
  } catch (error) {
    dispatch(actions.loginUserError(error.message));
  }
};

const logoutUser = () => async dispatch => {
  dispatch(actions.logoutUserRequest());
  try {
    await axios.post('/users/logout');
    token.unset();
    dispatch(actions.logoutUserSuccess());
  } catch (error) {
    dispatch(actions.logoutUserError(error.message));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  // console.log('BEGIN OF CURRENT USER');
  const {
    auth: { token: persistedToken },
  } = getState();
  // console.log(persistedToken);
  if (!persistedToken) {
    return;
  }
  token.set(persistedToken);
  dispatch(actions.getCurrentUserRequest());
  try {
    const response = await axios.get('/users/current');
    dispatch(actions.getCurrentUserSuccess(response.data));
    // console.log('END OF CURRENT USER');
  } catch (error) {
    dispatch(actions.getCurrentUserError(error.message));
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};

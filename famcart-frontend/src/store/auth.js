// auth.js

import csrfFetch from './csrf'; // Assuming you have a csrfFetch utility

// Action Types
const SET_USER = 'auth/SET_USER';
const SIGN_UP_USER = 'auth/SIGN_UP_USER';
const LOGOUT_USER = 'auth/LOGOUT_USER';

// Thunks
export const signUpUser = (user) => async (dispatch) => {
  try {
    // Call your backend to sign up the user
    const response = await fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const newUser = await response.json();
      dispatch({
        type: SIGN_UP_USER,
        user: newUser,
      });
      return newUser;
    } else {
      const errorData = await response.json();
      throw errorData; // Throw the error data received from the server
    }
  } catch (error) {
    throw error; // Re-throw the error to be caught in the component
  }
};



export const loginUser = (formData) => async (dispatch) => {
  try {
    const response = await csrfFetch('http://localhost:3000/auth/sign_in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const userDataResponse = await response.json();
      const userData = userDataResponse.data; // Extract the actual user data from the response
      console.log(userData)
    
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('access-token', response.headers.get('access-token'));
      localStorage.setItem('client', response.headers.get('client'));
      localStorage.setItem('uid', response.headers.get('uid'));

      dispatch({
        type: SET_USER,
        payload: userData,
      });
      return true;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors); // Throw an error with the error messages
    }
  } catch (error) {
    throw error; // Re-throw the error to be caught in the component
  }
};


export const logoutUser = () => async (dispatch) => {

  const access_token = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');

  try {
    const response = await csrfFetch('http://localhost:3000/auth/sign_out', {
      method: 'DELETE',
      headers: {
        'access-token': access_token,
        'client': client,
        'uid': uid,
      },
    });

    if (response.ok) {
      localStorage.removeItem('access-token');
      localStorage.removeItem('client');
      localStorage.removeItem('uid');
      dispatch({
        type: LOGOUT_USER,
      });
      return true;
    }
     else {
      const errorData = await response.json();
      console.error('Logout Error:', errorData.errors);
    }
  } catch (error) {
    console.error('An error occurred during logoutUser:', error);
  }
};

export const loadUserFromLocalStorage = () => {
  return (dispatch) => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (user && typeof user === 'object') { // Check if user is an object
      dispatch({
        type: 'auth/SET_USER',
        payload: user
      });
    } else {
      console.error("User data in local storage is in incorrect format:", userString);
    }
  };
};


export const setUser = (user) => ({
  type: SET_USER,
  payload: user, // Use payload here instead of user
});



// Initial State
const initialState = {
  user: null,
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_USER:
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;

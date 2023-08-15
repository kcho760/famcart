import csrfFetch from './csrf'; // Assuming you have a csrfFetch utility

// Action Types
const SET_USER = 'auth/SET_USER';
const SIGN_UP_USER = 'auth/SIGN_UP_USER';

// Thunks
  export const signUpUser = (user) => async (dispatch) => {
    // Call your backend to sign up the user
    const response = await fetch('/auth', {
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
    }else {
        // Handle any errors that occur during registration
        const errorData = await response.json();
        console.error(errorData.errors);
        // You may also want to dispatch an action here to update your state with the error information
      }
  };
  
  export const setUser = (user) => ({
    type: SET_USER,
    user,
  });

// Initial State
const initialState = {
  user: null,
};

// Reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGN_UP_USER:
        return {
          ...state,
          user: action.user,
        };
      case SET_USER:
        return {
          ...state,
          user: action.user,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
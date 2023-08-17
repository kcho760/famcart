import csrfFetch from './csrf'; // Assuming you have a csrfFetch utility

// Action Types
const SET_LISTS = 'lists/SET_LISTS';
const FETCH_LIST = 'lists/FETCH_LIST';

// Thunks
// In your lists.js (or appropriate Redux file)
export const fetchLists = () => async dispatch => {
    try {
      const response = await fetch('http://localhost:3000/lists');
      if (response.ok) {
        const lists = await response.json();
        dispatch({ type: 'lists/SET_LISTS', lists });
      }
    } catch (error) {
      console.error('An error occurred while fetching the lists:', error);
    }
  };

// In your Redux action
export const fetchList = (listId) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3000/lists/${listId}`);
    if (response.ok) {
      const listWithItems = await response.json();
      dispatch({
        type: 'lists/FETCH_LIST',
        list: listWithItems,
      });
    }
  } catch (error) {
    console.error('Error fetching list:', error);
  }
};

// Initial state
const initialState = {
  currentList: null,
  all: [],
  // ...other properties
};

// Reducer
const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'lists/FETCH_LIST':
      return {
        ...state,
        currentList: {
          ...action.list, // Include the list's properties
          items: action.list.list_items, // Include the associated items
        },
      };
    case 'lists/SET_LISTS':
      return {
        ...state,
        all: action.lists,
      };
    default:
      return state;
  }
};

  
  export default listsReducer;
  


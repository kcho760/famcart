import csrfFetch from './csrf'; // Assuming you have a csrfFetch utility

// Action Types
const SET_LISTS = 'lists/SET_LISTS';
const FETCH_LIST = 'lists/FETCH_LIST';
const UPDATE_LIST_ITEM_CHECKED_STATUS = 'lists/UPDATE_LIST_ITEM_CHECKED_STATUS';
const CREATE_LIST = 'lists/CREATE_LIST';

// Thunks
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

export const createList = (listName, userId) => async (dispatch) => {
  try {
    const listData = { list: { name: listName, user_id: userId } }; // Include user_id

    const response = await csrfFetch('http://localhost:3000/lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(listData), // Send the correct structure
    });

    if (response.ok) {
      const newList = await response.json();
      dispatch({
        type: CREATE_LIST,
        newList,
      });
    } else {
      const errorResponse = await response.json(); // Read the response body
      console.error('Failed to create a new list, server response:', errorResponse); // Log server error response
    }
  } catch (error) {
    console.error('Error creating a new list:', error); // Log any JavaScript errors
  }
};


export const updateListItemCheckedStatus = (listId, itemId, checked) => async (dispatch) => {
  try {
    const response = await csrfFetch(`http://localhost:3000/lists/${listId}/list_items/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checked }),
    });

    if (response.ok) {
      const updatedItem = await response.json();
      dispatch({
        type: UPDATE_LIST_ITEM_CHECKED_STATUS,
        listId,
        updatedItem,
      });
    } else {
      console.error('Failed to update checked status');
    }
  } catch (error) {
    console.error('Error updating checked status:', error);
  }
};


// Initial state
const initialState = {
  currentList: null,
  all: [],
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
    case UPDATE_LIST_ITEM_CHECKED_STATUS:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list_items: state.currentList.list_items.map(item => {
            if (item.id === action.updatedItem.id) {
              return action.updatedItem;
            }
            return item;
          }),
        },
      };
      case CREATE_LIST:
        return {
          ...state,
          all: [...state.all, action.newList], // Add the new list to the list of all lists
        };
    default:
      return state;
  }
};

  
  export default listsReducer;
  


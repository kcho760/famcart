import csrfFetch from './csrf';

// Action Types
export const UPDATE_LIST_ITEM_CHECKED_STATUS_REQUEST = 'UPDATE_LIST_ITEM_CHECKED_STATUS_REQUEST';
export const UPDATE_LIST_ITEM_CHECKED_STATUS_SUCCESS = 'UPDATE_LIST_ITEM_CHECKED_STATUS_SUCCESS';
export const UPDATE_LIST_ITEM_CHECKED_STATUS_FAILURE = 'UPDATE_LIST_ITEM_CHECKED_STATUS_FAILURE';

// Action Creators
export const updateListItemCheckedStatusRequest = () => ({
  type: UPDATE_LIST_ITEM_CHECKED_STATUS_REQUEST,
});

export const updateListItemCheckedStatusSuccess = (itemId, checked) => ({
  type: UPDATE_LIST_ITEM_CHECKED_STATUS_SUCCESS,
  payload: { itemId, checked },
});

export const updateListItemCheckedStatusFailure = (error) => ({
  type: UPDATE_LIST_ITEM_CHECKED_STATUS_FAILURE,
  payload: error,
});

// Thunk for Async Update
export const updateListItemCheckedStatus = (itemId, checked) => {
  return async (dispatch) => {
    dispatch(updateListItemCheckedStatusRequest());

    try {
      const response = await fetch(`http://localhost:3000/list_items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checked }),
      });

      if (!response.ok) {
        throw new Error('Failed to update checked status');
      }

      const updatedItem = await response.json();

  dispatch({
    type: UPDATE_LIST_ITEM_CHECKED_STATUS_SUCCESS,
    payload: { itemId, checked },
  });
    } catch (error) {
      dispatch(updateListItemCheckedStatusFailure(error.toString()));
    }
  };
};

// Reducer
const initialState = {
  loading: false,
  currentList: {
    items: [],
  },
  error: null,
};

export const listItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST_ITEM_CHECKED_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_LIST_ITEM_CHECKED_STATUS_SUCCESS:
      console.log("Action payload:", action.payload);
      return {
        ...state,
        loading: false,
        currentList: {
          ...state.currentList,
          items: state.currentList.items.map(item => {
            if (item.id === action.payload.itemId) {
              console.log("Updating item:", item);
              return { ...item, checked: action.payload.checked };
            }
            return item;
          }),            
        },
      };
    case UPDATE_LIST_ITEM_CHECKED_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export default listItemReducer;
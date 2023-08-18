import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateListItemCheckedStatus } from '../../store/list'; // Import the thunk function
import './ListDetails.css';

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function ListDetails() {
  const currentList = useSelector(state => state.lists.currentList);
  const dispatch = useDispatch();

  const handleCheckboxChange = (listId, itemId, checked) => {
    dispatch(updateListItemCheckedStatus(listId, itemId, checked));
  };

  const checkedStatuses = currentList?.list_items?.map(item => item.checked) || [];

  useEffect(() => {
  }, [checkedStatuses]);

  if (!currentList) {
    return null;
  }

  return (
    <div className="list-details">
      <h2>{currentList.name}</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Created At</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody>
        {currentList.list_items.map((listItem) => {
          const correspondingItem = currentList.items.find(item => item.id === listItem.item_id);

          return (
            <tr key={listItem.id}>
              <td>
                <input
                  type="checkbox"
                  checked={listItem.checked}
                  onChange={() => handleCheckboxChange(currentList.id, listItem.id, !listItem.checked)}
                />
              </td>
              <td>{correspondingItem?.item.name}</td>
              <td>{listItem.quantity}</td>
              <td>{correspondingItem?.item.unit}</td>
              <td>{formatDate(listItem.created_at)}</td>
              <td>{correspondingItem?.item.added_by_name}</td>
            </tr>
          );
        })}

        </tbody>
      </table>
    </div>
  );
}

export default ListDetails;

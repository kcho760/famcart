import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateListItemCheckedStatus } from '../../store/listItem'; // Import the thunk function
import './ListDetails.css';

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function ListDetails() {
  const currentList = useSelector(state => state.lists.currentList);
  const dispatch = useDispatch();

  const handleCheckboxChange = (itemId, checked) => {
    dispatch(updateListItemCheckedStatus(itemId, checked));
  };

  // Create a dependency array by extracting the checked properties from currentList.items
  const checkedStatuses = currentList?.items?.map(item => item.checked) || [];

  // This useEffect will cause the component to rerender when any of the checked statuses changes
  useEffect(() => {
    // You can include additional logic here if needed
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
          {currentList.list_items.map((listItem) => (
            <tr key={listItem.id}>
              <td>
                <input
                  type="checkbox"
                  checked={listItem.checked}
                  onChange={() => handleCheckboxChange(listItem.id, !listItem.checked)}
                />
              </td>
              <td>{listItem.item.name}</td>
              <td>{listItem.quantity}</td>
              <td>{listItem.item.unit}</td>
              <td>{formatDate(listItem.created_at)}</td>
              <td>{listItem.item.added_by_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListDetails;

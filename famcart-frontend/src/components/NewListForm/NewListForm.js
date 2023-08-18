import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createList } from '../../store/list'; // Import the createList action
import './NewListForm.css';
import Modal from '../Modal/Modal'; // Import your Modal component

function NewListForm({ onClose }) {
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim() !== '') {
      dispatch(createList(listName));
      onClose();
    }
  };

  return (
    <Modal show={true} onClose={onClose}> {/* Use the Modal component */}
      <div className="new-list-form">
        <h2>Create a New List</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list name"
          />
          <div className="buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default NewListForm;

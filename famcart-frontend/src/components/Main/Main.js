import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/auth'; // Import the logoutUser action
import { useNavigate } from 'react-router-dom'; 
import ListDetails from '../ListDetails/ListDetails';
import { fetchLists, fetchList } from '../../store/list';
import './Main.css';

function Main() {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const navigate = useNavigate(); // Initialize the navigate function
  const lists = useSelector(state => state.lists.all); // Select lists from Redux state
  const [selectedList, setSelectedList] = useState(null);

  // Function to handle the logout action
  const handleLogout = async () => {
    const success = await dispatch(logoutUser());
    if (success === true) {
      navigate('/');
    }
  };

  // Fetch the lists from your API
  useEffect(() => {
    dispatch(fetchLists()); // Dispatch the fetchLists action
  }, [dispatch]);

  const handleTabClick = (list) => {
    dispatch(fetchList(list.id)); // Fetch the specific list
    setSelectedList(list); // Set the clicked list as the selected list
  };
  

  return (
    <div>
      <div className='logoutbutton' style={{ textAlign: 'right' }}>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="main-container">
        <div className="tabs-container">
          {lists.map((list) => (
            <div key={list.id} className="tab" onClick={() => handleTabClick(list)}>
              {list.name}
            </div>
          ))}
        </div>
        <div className="list-container">
          {selectedList && <ListDetails list={selectedList} />}
        </div>
      </div>
    </div>
  );
}

export default Main;

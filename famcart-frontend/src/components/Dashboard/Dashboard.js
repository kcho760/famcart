import React from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch from React Redux
import { logoutUser } from '../../store/auth'; // Import the logoutUser action
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './Dashboard.css';

function Dashboard() {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle the logout action
  const handleLogout = async () => {
    const success = await dispatch(logoutUser()); // Dispatch the logoutUser action and await its result
    if (success === true) { // If logout was successful (I've used 'false' as per your action, but this may differ based on your implementation)
      navigate('/'); // Redirect to the splash page
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Welcome to the Dashboard!</h1>
        <p>Your content goes here</p>
        <button onClick={handleLogout} className="logout-button">Logout</button> {/* Logout button */}
      </div>
    </div>
  );
}

export default Dashboard;

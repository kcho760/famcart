import './SplashPage.css'; // Import your CSS for styling
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import {LoginForm} from '../LoginSignupForm/LoginSignupForm';
import {SignupForm} from '../LoginSignupForm/LoginSignupForm';

function SplashPage() {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState('login');

  const handleLoginClick = () => {
    setFormType('login');
    setShowModal(true);
  };

  const handleSignupClick = () => {
    setFormType('signup');
    setShowModal(true);
  };

  return (
    <div className="splash-container">
      <div className="splash-text">
        <h1>Welcome to the Cho Family Shopping App</h1>
        <h2>Olesya...Click the big green button!!!</h2>
      </div>
      <div className="button-container">
        <button className="login-button" onClick={handleLoginClick}>Log In</button>
        <button className="signup-button" onClick={handleSignupClick}>Sign Up</button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {formType === 'login' ? <LoginForm /> : <SignupForm />}
      </Modal>
    </div>
  );
}


export default SplashPage;

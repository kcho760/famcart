import './LoginSignupForm.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpUser, loginUser } from '../../store/auth.js';
import React, { useState } from 'react';

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const success = await dispatch(loginUser(formData));
      if (success) {
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  // Function to handle the demo user login
  const handleDemoLogin = async () => {
    const demoUser = {
      email: 'test1@example.com',
      password: 'password123'
    };

    try {
      const success = await dispatch(loginUser(demoUser));
      if (success) {
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors(error.message);
    }
  };


  return (
    <div>
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <label className="signup-form-label" htmlFor="email">Email:</label>
        <input className="signup-form-input" type="email" id="email" name="email" required />

        <label className="signup-form-label" htmlFor="password">Password:</label>
        <input className="signup-form-input" type="password" id="password" name="password" required />

        <button className="signup-form-button" type="submit">Login</button>
        <button className="signup-form-button demo-button" type="button" onClick={handleDemoLogin}>Demo User</button>
      </form>

      {errors && <div className="error-message">{errors}</div>}
    </div>
  );
}

// SignupForm.js
export function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
      password_confirmation: e.target.passwordConfirmation.value,
    };

    try {
      const newUser = await dispatch(signUpUser(formData));
      if (newUser) {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.errors) {
        const errorMessages = Object.values(error.errors).flat();
        setErrors(errorMessages);
      } else {
        setErrors(['An error occurred. Please check your input and try again.']);
      }
    }
  };

  return (
    <div>
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <label className="signup-form-label" htmlFor="email">Email:</label>
        <input className="signup-form-input" type="email" id="email" name="email" required />

        <label className="signup-form-label" htmlFor="password">Password:</label>
        <input className="signup-form-input" type="password" id="password" name="password" required />

        <label className="signup-form-label" htmlFor="passwordConfirmation">Password Confirmation:</label>
        <input className="signup-form-input" type="password" id="passwordConfirmation" name="password_confirmation" required />

        <button className="signup-form-button" type="submit">Sign Up</button>
      </form>

      {errors.length > 0 && (
        <div className="error-message">
          <ul>
            {errors.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
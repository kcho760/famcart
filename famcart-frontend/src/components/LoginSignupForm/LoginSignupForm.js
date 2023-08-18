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
      const user = await dispatch(loginUser(formData)); // loginUser should return the user's data
      if (user) {
        console.log('User object:', user);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors(error.message);
    }
  };
  
  const handleDemoLogin = async () => {
    const demoUser = {
      email: 'test1@gmail.com',
      password: 'kevinc13'
    };
    try {
      await dispatch(loginUser(demoUser)); // loginUser should return the user's data
      navigate('/dashboard');
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
      const newUser = await dispatch(signUpUser(formData)); // signUpUser should return the new user's data
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser)); // Save user data to local storage
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
import { useState } from 'react';
import { addUser } from '../store/userSlice';
import apiClient from '../services/apiClient';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const useLogin = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = () => {
    apiClient
      .post('/login', {
        emailId,
        password,
      })
      .then((res) => {
        dispatch(addUser(res.data.data));
        navigate('/');
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || 'Login failed. Please try again.';
        setError(errorMessage);
      });
  };

  const handleSignup = () => {
    apiClient
      .post('/signup', {
        firstName,
        lastName,
        emailId,
        password,
      })
      .then((res) => {
        dispatch(addUser(res.data.data));
        navigate('/profile');
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || 'Signup failed. Please try again.';
        setError(errorMessage);
      });
  };

  return {
    emailId,
    setEmailId,
    password,
    setPassword,
    handleLogIn,
    error,
    setError,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    isLogin,
    setIsLogin,
    handleSignup,
  };
};
export default useLogin;

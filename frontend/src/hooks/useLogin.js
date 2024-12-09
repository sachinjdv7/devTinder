import { useState } from 'react';
import { addUser } from '../store/userSlice';
import apiClient from '../services/apiClient';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const useLogin = () => {
  const [emailId, setEmailId] = useState('sachin@gmail.com');
  const [password, setPassword] = useState('Sachin@123');
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
      .catch((err) => console.log(err));
  };

  return { emailId, setEmailId, password, setPassword, handleLogIn };
};
export default useLogin;

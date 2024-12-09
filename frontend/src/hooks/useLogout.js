import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { removeUser } from '../store/userSlice';
import apiClient from '../services/apiClient';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    apiClient
      .post('/logout')
      .then(() => {
        dispatch(removeUser());
        navigate('/login');
      })
      .catch((err) => console.error(err));
  };

  return { handleLogout };
};

export default useLogout;

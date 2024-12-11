import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import apiClient from '../services/apiClient';
import { addUser } from '../store/userSlice';

const userCurrentuser = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user)
      apiClient
        .get('/profile/view')
        .then((res) => dispatch(addUser(res.data)))
        .catch((err) => {
          if (err.status === 401) navigate('/login');
          console.error(err);
        });
  }, [user]);
};

export default userCurrentuser;

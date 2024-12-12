import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../services/apiClient';
import { addConnectionRequests } from '../store/connectionRequestsSlice';

const useConnectionRequests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  useEffect(() => {
    apiClient
      .get('/user/requests/received')
      .then((res) => {
        dispatch(addConnectionRequests(res.data.data));
      })
      .catch((err) => console.error(err));
  }, []);
  return { requests };
};

export default useConnectionRequests;

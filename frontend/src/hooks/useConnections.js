import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../services/apiClient';
import { addConnections } from '../store/connestionsSlice';

const useConnections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  useEffect(() => {
    apiClient
      .get('/user/connections/match')
      .then((res) => {
        dispatch(addConnections(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return { connections };
};

export default useConnections;

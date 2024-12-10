import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../services/apiClient';
import { addFeed } from '../store/feedSlice';

const useFeed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!feed)
      apiClient
        .get('/feed')
        .then((res) => {
          console.log(res.data.data);
          dispatch(addFeed(res.data.data));
        })
        .catch((err) => console.error(err));
  }, []);
  return { feed };
};

export default useFeed;

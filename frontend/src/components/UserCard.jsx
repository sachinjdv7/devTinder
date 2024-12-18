import React from 'react';
import apiClient from '../services/apiClient';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../store/feedSlice';

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;
  const dispatch = useDispatch();

  const handleRequest = async (status, userId) => {
    try {
      const req = await apiClient.post(`/request/send/${status}/${userId}`, {});
      dispatch(removeFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 shadow-xl p-4 w-full max-w-md">
      <figure className="mb-3">
        <img
          src={
            photoUrl ||
            'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
          }
          alt={`${firstName}'s profile`}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title text-center">{`${firstName} ${lastName}`}</h2>
        {age && gender && (
          <p className="text-center text-sm">
            {age} years old {gender}
          </p>
        )}
        <p className="text-sm text-center overflow-hidden text-ellipsis break-words max-h-24">
          {about}
        </p>
        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => handleRequest('ignored', _id)}
          >
            Ignored
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleRequest('intrested', _id)}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

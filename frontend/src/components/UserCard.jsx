import React from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about } = user;

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
          <button className="btn btn-primary">Ignored</button>
          <button className="btn btn-secondary">Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

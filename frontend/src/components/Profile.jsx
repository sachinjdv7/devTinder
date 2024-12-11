import React from 'react';
import EditeProfile from './EditeProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div>
        <EditeProfile user={user} />
      </div>
    )
  );
};

export default Profile;

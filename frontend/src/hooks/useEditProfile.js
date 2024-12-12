import { useState } from 'react';
import { addUser } from '../store/userSlice';
import apiClient from '../services/apiClient';
import { useDispatch } from 'react-redux';

const useEditProfile = (user) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleEditProfile = async () => {
    setError('');
    try {
      const user = await apiClient.put('/profile/edit', {
        firstName,
        lastName,
        photoUrl,
        age,
        gender,
        about,
      });
      dispatch(addUser(user?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(err.response.data);
    }
  };
  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    photoUrl,
    setPhotoUrl,
    age,
    setAge,
    gender,
    setGender,
    about,
    setAbout,
    error,
    showToast,
    handleEditProfile,
  };
};

export default useEditProfile;

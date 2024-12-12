import { useEditProfile } from '../hooks';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
  const {
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
  } = useEditProfile(user);
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start min-h-screen bg-base-200 gap-5 p-5">
      <div className="w-full max-w-md">
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      <div className="card bg-base-300 shadow-xl p-5 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Edit Profile
        </h2>

        {/* First Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your last name"
          />
        </div>

        {/* Photo URL */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Photo URL</label>
          <input
            type="text"
            name="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Photo URL"
          />
        </div>

        {/* Age */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your age"
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Other</option>
          </select>
        </div>

        {/* About */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">About</label>
          <textarea
            name="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Tell us about yourself"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-primary w-full"
            onClick={handleEditProfile}
          >
            Save
          </button>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

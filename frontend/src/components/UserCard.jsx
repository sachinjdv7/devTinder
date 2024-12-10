const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions flex justify-center mt-4">
          <button className="btn btn-primary mr-4 ">Ignored</button>
          <button className="btn btn-secondary">Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

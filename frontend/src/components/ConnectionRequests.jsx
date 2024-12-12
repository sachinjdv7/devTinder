import { useConnectionRequests } from '../hooks';

const ConnectionRequests = () => {
  const { requests } = useConnectionRequests();

  if (!requests) return;

  if (requests.length === 0) return <div>No Connections</div>;

  return (
    <div className=" text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-center mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + ' ' + lastName}
              </h2>
              {age && gender && <p>{age + ', ' + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2">Reject</button>
              <button className="btn btn-secondary mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionRequests;

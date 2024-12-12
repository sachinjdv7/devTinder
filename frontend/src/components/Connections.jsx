import { useConnections } from '../hooks';

const Connections = () => {
  const { connections } = useConnections();
  if (!connections) return;

  if (connections.length === 0) return <div>No Connections</div>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

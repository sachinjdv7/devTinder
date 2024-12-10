import { useFeed } from '../hooks';
import UserCard from './UserCard';

const Feed = () => {
  const { feed } = useFeed();
  return (
    <div className="flex items-center justify-center my-4">
      {feed && <UserCard user={feed[3]} />}
    </div>
  );
};

export default Feed;

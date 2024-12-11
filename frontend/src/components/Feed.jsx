import { useFeed } from '../hooks';
import UserCard from './UserCard';

const Feed = () => {
  const { feed } = useFeed();
  return (
    feed && (
      <div className="flex items-center justify-center my-4">
        <UserCard user={feed[2]} />
      </div>
    )
  );
};

export default Feed;

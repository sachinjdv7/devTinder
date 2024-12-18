import { useFeed } from '../hooks';
import UserCard from './UserCard';

const Feed = () => {
  const { feed } = useFeed();

  if (!feed) return;

  if (feed.length <= 0) return <h1 className="flex justify-center">No Feed</h1>;
  return (
    feed && (
      <div className="flex items-center justify-center my-4">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

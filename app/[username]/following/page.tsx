'use client';

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import AllFollowUsers from '../AllFolloUsers';
import { getfollowing } from '@/actions/profile/getfollowing';
import AllFolloUserSkeleton from '../AllFolloUserSkeleton';

const FollowersPage = () => {
  const { username } = useParams();
  const [following, setFollowing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      handleGetFollowers();
    }
  }, [username]);

  const handleGetFollowers = async () => {
    setLoading(true);
    try {
      const data = await getfollowing(username as string);
      console.log(data)
      setFollowing(data || []);
    } catch (err) {
      console.error('Error fetching followers:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-2 bg-black min-h-screen text-white">
      {loading ? (
        <AllFolloUserSkeleton/>
      ) : (
        <AllFollowUsers users={following} text="following"/>
      )}
    </div>
  );
};

export default FollowersPage;

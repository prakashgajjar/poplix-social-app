'use client';

import { useEffect, useState } from 'react';
import { getfollowers } from '@/actions/profile/getfollowers';
import { useParams } from 'next/navigation';
import AllFollowUsers from '../AllFolloUsers';
import AllFolloUserSkeleton from '../AllFolloUserSkeleton';

const FollowersPage = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (username) {
      handleGetFollowers();
    }
  }, [username]);

  const handleGetFollowers = async () => {
    setLoading(true);
    try {
      const data = await getfollowers(username as string);
      // console.log(data)
      setFollowers(data || []);
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
        <AllFollowUsers users={followers }  text="followers"/>
      )}
    </div>
  );
};

export default FollowersPage;

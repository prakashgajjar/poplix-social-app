import React, { useState } from 'react'
import { followuser } from '@/actions/profile/follow'

const Follow = ({ id, checkFollow }) => {
    const [follow, setFollow] = useState<boolean>(false);
    const handleFollow = async () => {
        const data = await followuser(id);
        setFollow(data);
    };

    return (
        <div>
            <button
                className={`
      px-4 py-1 rounded-full font-semibold text-sm backdrop-blur-md border transition-all duration-300 
      ${(follow || checkFollow)
                        ? "bg-transparent text-red-500 border-red-400 hover:bg-red-500 hover:text-white"
                        : "bg-transparent text-blue-500 border-blue-400 hover:bg-blue-500 hover:text-white"
                    }
    `}
                onClick={handleFollow}
            >
                {(follow || checkFollow) ? "Unfollow" : "Follow"}
            </button>
        </div>

    )
}

export default Follow
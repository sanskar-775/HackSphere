import React, { useEffect } from 'react';
import Hackathons from './Hackathons';
import { useSession } from 'next-auth/react'; 
import { useRouter } from 'next/router'; 

function Events() {
  const { data: session, status } = useSession(); 
  const router = useRouter(); 

  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/'); // Redirect only after session is determined
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null; // Avoid rendering anything if redirect is happening
  }

  return (
    <div>
      <Hackathons />
    </div>
  );
}

export default Events;

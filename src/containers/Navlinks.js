import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function Navlinks() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEventsClick = (e) => {
    if (!session) {
      e.preventDefault();
      // In your handleEventsClick function
toast.error('Please login to view events!', {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    style: {
      borderLeft: '3px solid #ef4444' // Red-500
    },
  });
    }
  };

  return (
    <>
      <li className="mr-2"><Link 
          href="/Host" 
          onClick={handleEventsClick}
          className={!session ? 'cursor-not-allowed' : ''}
        >
          Host
        </Link></li>
      <li className="mr-2"><Link href="/Aboutus">About Us</Link></li>
      <li className="mr-2">
        <Link 
          href="/events" 
          onClick={handleEventsClick}
          className={!session ? 'cursor-not-allowed' : ''}
        >
          Events
        </Link>
      </li>
    </>
  );
}

export default Navlinks;
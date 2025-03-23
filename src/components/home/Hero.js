import Earth from "./Earth";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Hero() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEventsClick = (e) => {
    if (!session) {
      e.preventDefault();
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
      // Redirect after toast
      setTimeout(() => router.push('/'), 2000);
    }
  };

  return (
    <div className="hero-container flex flex-col md:flex-row items-center justify-between p-8 bg-black text-white">
      <div className="hero-text flex flex-col items-center relative">
        <h1 className="text-5xl font-bold relative z-10 glow-gradient-text">HackSphere</h1>
        <h1 
          className="text-5xl font-bold absolute top-[20%] left-[15.87%] w-full opacity-40 transform scale-y-[-1] mask-gradient"
        >
          HackSphere
        </h1>
        <p className="text-lg mt-2 p-8">Bringing Global Hackathons to One Place.</p>
        <Link 
          href="/events" 
          onClick={handleEventsClick}
          className={`btn-outline mt-4 rounded ${
            !session ? 'cursor-not-allowed' : ''
          }`}
        >
          Explore Events
        </Link>
      </div>
      
      {/* Earth Animation */}
      <div className="hero-animation w-[400px] h-[400px]">
        <Earth />
      </div>
    </div>
  );
}
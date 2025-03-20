import Earth from "./Earth";
import Link from "next/link";

export default function Hero() {
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
        <Link href="/events" className="btn-outline mt-4 rounded">Explore Events</Link>
      </div>
      
      {/* Earth Animation */}
      <div className="hero-animation w-[400px] h-[400px]">
        <Earth />
      </div>
    </div>
  );
}
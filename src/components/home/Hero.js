import Earth from "./Earth";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero-container flex flex-col md:flex-row items-center justify-between p-8 bg-black text-white">
      <div className="hero-text flex flex-col items-center">
        <h1 className="text-4xl font-bold">HackSphere</h1>
        <p className="text-lg mt-2">Bringing Global Hackathons to One Place.</p>
        {/*  <button className="mt-4 px-6 py-2 bg-blue-600 rounded"></button> */}
        <Link href="/events" className="btn-outline mt-4 rounded">Explore Events</Link>
      </div>
      
      {/* Earth Animation */}
      <div className="hero-animation w-[400px] h-[400px]">
        <Earth />
      </div>
    </div>
  );
}
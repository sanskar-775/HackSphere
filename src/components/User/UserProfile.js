// components/User/UserProfile.js
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import EventCard from '@/components/Events/EventCard';

gsap.registerPlugin(ScrollTrigger);

const UserProfile = ({ user }) => {
  useEffect(() => {
    // GSAP animations
    gsap.from('.profile-section', {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out',
    });

    ScrollTrigger.create({
      trigger: ".events-section",
      start: "top center",
      animation: gsap.fromTo(".event-card", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1 }
      ),
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="profile-section card bg-base-100 shadow-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="avatar"
          >
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.image || '/default-avatar.png'} alt="Profile" />
            </div>
          </motion.div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
            <p className="text-lg text-neutral-content">{user?.email}</p>
            <div className="mt-4 flex gap-4 justify-center md:justify-start">
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Bookmarked Events</div>
                  <div className="stat-value">{user?.bookmarkedEvents?.length || 0}</div>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Past Events</div>
                  <div className="stat-value">{user?.pastEvents?.length || 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Sections */}
      <div className="events-section space-y-8">
        {/* Bookmarked Events */}
        <motion.section 
          className="card bg-base-100 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-3xl font-bold mb-6">Bookmarked Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.bookmarkedEvents?.length > 0 ? (
              user.bookmarkedEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-neutral-content">No bookmarked events yet</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Past Events */}
        <motion.section 
          className="card bg-base-100 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-3xl font-bold mb-6">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.pastEvents?.length > 0 ? (
              user.pastEvents.map((event) => (
                <EventCard key={event._id} event={event} isPast />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-neutral-content">No past events to show</p>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default UserProfile;
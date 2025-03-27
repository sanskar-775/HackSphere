// components/Events/EventCard.js
import { motion } from 'framer-motion';
import Link from 'next/link';

const EventCard = ({ event, isPast }) => {
  return (
    <motion.div 
      className="event-card card bg-base-100 shadow-xl"
      whileHover={{ y: -5 }}
    >
      <figure className="px-4 pt-4">
        <img 
          src={event.image || '/event-placeholder.jpg'} 
          alt={event.title} 
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        <div className="badge badge-outline">{event.category}</div>
        <div className="space-y-2 mt-2">
          <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {event.location}
          </p>
        </div>
        <div className="card-actions mt-4">
          {isPast ? (
            <button className="btn btn-primary btn-block" disabled>
              Event Ended
            </button>
          ) : (
            <Link href={`/events/${event.slug}`} className="btn btn-primary btn-block">
              View Event
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
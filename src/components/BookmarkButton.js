// components/BookmarkButton.js
import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const BookmarkButton = ({ event, source, isBookmarked, onUnauthenticated }) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleBookmark = async () => {
    if (!session) {
      onUnauthenticated();
      return;
    }

    setLoading(true);
    try {
      const action = bookmarked ? 'remove' : 'add';
      const response = await fetch(`/api/bookmarks/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventData: {
            ...event,
            source: source,
            eventId: event.id || event._id,
            date: event.start // Using start date as reference
          }
        })
      });

      const result = await response.json();
      if (result.success) {
        setBookmarked(result.bookmarked);
      }
    } catch (error) {
      console.error('Bookmark update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleBookmark}
      disabled={loading}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`bookmark-btn ${bookmarked ? 'text-primary' : 'text-gray-400'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill={bookmarked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </motion.button>
  );
};

export default BookmarkButton;
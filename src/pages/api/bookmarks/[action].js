// pages/api/bookmarks/[action].js
import { getSession } from 'next-auth/react';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const { action } = req.query;
  const { eventData } = req.body;

  try {
    const user = await User.findOne({ email: session.user.email });

    switch (action) {
      case 'add':
        // Check if already bookmarked
        const exists = user.bookmarkedEvents.some(e => 
          e.eventId === eventData.eventId && e.source === eventData.source
        );
        
        if (!exists) {
          user.bookmarkedEvents.push(eventData);
          await user.save();
        }
        return res.status(200).json({ success: true, bookmarked: true });

      case 'remove':
        user.bookmarkedEvents = user.bookmarkedEvents.filter(e => 
          !(e.eventId === eventData.eventId && e.source === eventData.source)
        );
        await user.save();
        return res.status(200).json({ success: true, bookmarked: false });

      default:
        return res.status(400).json({ success: false, error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Bookmark error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}
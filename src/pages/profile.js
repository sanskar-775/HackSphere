// pages/profile.js
import { getSession } from 'next-auth/react';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { motion } from 'framer-motion';
import UserProfile from '@/components/User/UserProfile';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user.email }).lean(); // Fetch user

  return {
    props: {
      user: user ? JSON.parse(JSON.stringify(user)) : null,
    },
  };
}

export default function ProfilePage({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-base-200"
    >
      <UserProfile user={user} />
    </motion.div>
  );
}

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '../../../lib/db';
import User from '../../../models/User';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !profile) {
        console.error("Missing account or profile data");
        return false;
      }

      await dbConnect();

      const { email, name, image } = user;
      const provider = account.provider;
      const providerId = profile?.sub || profile?.id; // 🔥 Fix: Ensure providerId exists

      if (!providerId) {
        console.error("Missing providerId in profile:", profile);
        return false; // Prevent sign-in if providerId is missing
      }

      let existingUser = await User.findOne({ providerId });

      if (!existingUser) {
        existingUser = await User.create({
          email,
          name,
          image,
          provider,
          providerId,
        });
      }

      return true;
    },
    async session({ session , token  }) {
      await dbConnect();

      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.id = dbUser._id.toString();
      }
      
      session.user.image = token.picture;
    return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

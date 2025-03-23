import { useSession, signIn, signOut } from 'next-auth/react'; // Import NextAuth.js hooks

function NavProfileLinks() {
  const { data: session } = useSession(); // Get the session

  const handleSignIn = () => {
    signIn('google'); // Trigger Google OAuth sign-in
  };

  const handleSignOut = () => {
    signOut(); // Trigger sign-out
  };

  return (
    <div>
      {session ? ( // If the user is authenticated
        <div className="flex items-center gap-2">
          <img
            src={session.user.image}
            alt={session.user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">{session.user.name}</span>
          <button
            className="btn btn-sm text-xs normal-case hover:bg-primary btn-outline"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : ( // If the user is not authenticated
        <button
          className="btn btn-sm text-xs normal-case hover:bg-primary btn-outline"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      )}
    </div>
  );
}

export default NavProfileLinks;
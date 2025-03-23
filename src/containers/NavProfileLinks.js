import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

function NavProfileLinks() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = () => {
    signIn('google');
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' }); // Directly specify the redirect URL
  };

  return (
    <div>
      {session ? (
        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
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
      ) : (
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
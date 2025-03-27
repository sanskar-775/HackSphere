import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { UserIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';




function NavProfileLinks(mobile) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = () => {
    signIn('google');
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div>
      {session ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="avatar-animated-border">
              <div className="avatar-animated-wrapper w-9 h-9">
                <Image
                  width={32}
                  height={32}
                  src={session.user.image}
                  alt={session.user.name}
                  className="avatar-animated-image w-8 h-8"
                />
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a 
                className="text-sm" 
                onClick={() => router.push('/profile')}
              >
                <UserIcon className="w-4 h-4" />
                Profile
              </a>
            </li>
            <li>
              <a className="text-sm" onClick={handleSignOut}>
                <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                Logout
              </a>
            </li>
          </ul>
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
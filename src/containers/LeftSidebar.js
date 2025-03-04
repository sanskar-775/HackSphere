import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { LEFT_DRAWER_TYPES } from '../utils/globalConstantUtil';
import { useDispatch, useSelector } from 'react-redux';
import { closeLeftSidebar } from '@/store/leftSidebarSlice';

function LeftSidebar() {
  const { isOpen, bodyType, header } = useSelector((state) => state.leftSidebar);
  const dispatch = useDispatch();

  const closeDrawer = () => {
    dispatch(closeLeftSidebar());
  };

  // Mock data for past hackathons (Replace this with dynamic data if needed)
  const pastHackathons = [
    { name: 'HackTheFuture 2024', date: 'Jan 15, 2024', link: '/hackathons/hackthefuture' },
    { name: 'CodeStorm 2023', date: 'Oct 5, 2023', link: '/hackathons/codestorm' },
    { name: 'DevSprint 2023', date: 'Aug 20, 2023', link: '/hackathons/devsprint' },
  ];

  return (
    <div
      className={
        'fixed overflow-hidden z-20 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen ? 'transition-opacity opacity-100 duration-100 -translate-x-0' : 'transition-all delay-500 opacity-0 -translate-x-full')
      }
    >
      <section
        className={
          'w-80 md:w-96 left-0 absolute bg-base-100 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ' +
          (isOpen ? '-translate-x-0' : '-translate-x-full')
        }
      >
        <div className="relative pb-5 flex flex-col h-full">
          {/* Header */}
          <div className="navbar flex pl-4 pr-4 justify-between shadow-md">
            <span className="font-bold text-xl">{header || 'Past Hackathons'}</span>
            <button className="float-right btn btn-circle btn-outline btn-sm" onClick={closeDrawer}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Content: Past Hackathons */}
          <div className="overflow-y-scroll p-4">
            <div className="flex flex-col w-full space-y-4">
              {pastHackathons.length > 0 ? (
                pastHackathons.map((hackathon, index) => (
                  <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
                    <h3 className="text-lg font-semibold">{hackathon.name}</h3>
                    <p className="text-sm text-gray-500">{hackathon.date}</p>
                    <a href={hackathon.link} className="text-blue-600 hover:underline mt-2 block">
                      View Details →
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No past hackathons available.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Click outside to close */}
      <section className="w-screen h-full cursor-pointer" onClick={closeDrawer}></section>
    </div>
  );
}

export default LeftSidebar;

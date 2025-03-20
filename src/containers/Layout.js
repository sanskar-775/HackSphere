import Footer from "./Footer";
import Navbar from "./Navbar";
import Link from "next/link";
import Navlinks from "./Navlinks";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn, setToken } from "@/store/userSlice";
import { useEffect, useCallback } from "react";
import NavProfileLinks from "./NavProfileLinks";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");
    if (TOKEN) {
      dispatch(setLoggedIn(true));
      dispatch(setToken(TOKEN));
    }
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    // Implement logout logic here
  }, []);

  return (
    <>
    <div data-theme="night">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/cover-pic.png" />
        <meta name="image" content="/cover-pic.png" />
        <link rel="icon" href="/favicon-32x32.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="twitter:image" content="/android-512X512.png" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          <Navbar />
          <main className="overflow-y-auto">{children}</main>
          <Footer />
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-100">
            <li>
              <Link href="/">Home</Link>
            </li>
            <Navlinks />
            <div className="mt-12"></div>
            <NavProfileLinks />
          </ul>
        </div>
      </div>
      </div>
    </>
  );
}

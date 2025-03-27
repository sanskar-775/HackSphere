import Link from 'next/link'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import Navlinks from './Navlinks'
import { useEffect, useState } from 'react'
import NavProfileLinks from './NavProfileLinks'
import gsap from "gsap";

function Navbar() {
    const [currentTheme, setCurrentTheme] = useState(null)

    useEffect(() => {
        function breakTheText() {
            let h2 = document.querySelector("h2");
            if (!h2) return;
            
            let h2Text = h2.textContent;
            let splittedText = h2Text.split("");
            let halfIndex = Math.floor(splittedText.length / 2);
            let clutter = "";

            splittedText.forEach((letter, idx) => {
                if (idx <= halfIndex) {
                    clutter += `<span class="a">${letter}</span>`;
                } else {
                    clutter += `<span class="b">${letter}</span>`;
                }
            });

            h2.innerHTML = clutter;
        }

        breakTheText();

        gsap.from("h2 .a", {
            y: 70,
            duration: 1,
            delay: 0.3,
            opacity: 0,
            stagger: 0.15,
        });

        gsap.from("h2 .b", {
            y: 70,
            duration: 1,
            delay: 0.3,
            opacity: 0,
            stagger: -0.15,
        });
    }, [])

    return (
        <div className="w-full flex justify-center shadow-lg">
            <div className="navbar py-2 bg-base-100 max-w-7xl w-full">
                {/* Mobile Menu Button */}
                <div className="navbar-start">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <Bars3Icon className="h-5 inline-block w-5" />
                        </label>
                    </div>
                    {/* Logo */}
                    <div className="md:flex-1 flex-none px-2 mx-2">
                        <Link href="/">
                            <span className='font-bold text-3xl wave-text'>
                                <h2>HackSphere</h2>
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal custom-menu">
                        <Navlinks />
                    </ul>
                </div>

                {/* Profile Links - Desktop */}
                <div className="navbar-end hidden lg:flex">
                    <NavProfileLinks />
                </div>
            </div>
        </div>
    )
}

export default Navbar;
import Link from "next/link";

function Footer() {
    return (
        <div>
            <div className="bg-gray-900 flex justify-center text-white">
                <footer className="footer pt-10 pb-24 px-4 max-w-6xl text-base-content">
                    <div>
                        <p className="font-bold text-2xl text-blue-400">HackSphere 🚀</p>
                        <p className="text-gray-400 mt-2">Innovate. Code. Compete.</p>
                    </div>
                    <div>
                        <span className="footer-title text-blue-300">Quick Links</span>
                        <Link href="/about" className="link link-hover text-gray-400">About HackSphere</Link>
                        <Link href="/faq" className="link link-hover text-gray-400">FAQs</Link>
                        <Link href="/schedule" className="link link-hover text-gray-400">Event Schedule</Link>
                    </div>
                    <div>
                        <span className="footer-title text-blue-300">Legal</span>
                        <Link href="/privacy-policy" className="link link-hover text-gray-400">Privacy Policy</Link>
                        <Link href="/terms" className="link link-hover text-gray-400">Terms & Conditions</Link>
                    </div>
                    <div>
                        <span className="footer-title text-blue-300">Connect with Us</span>
                        <div className="flex gap-4 mt-2">
                            <Link href="https://twitter.com/hacksphere" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z"/>
                                </svg>
                            </Link>
                            <Link href="https://linkedin.com/company/hacksphere" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-10 18h-3v-10h3v10zm-1.5-11.267c-.967 0-1.5-.7-1.5-1.5s.534-1.5 1.5-1.5 1.5.7 1.5 1.5-.533 1.5-1.5 1.5zm12.5 11.267h-3v-5.066c0-1.354-.546-2.267-1.833-2.267-1.013 0-1.5.7-1.5 2.267v5.066h-3v-10h3v1.567c.733-1.133 2.067-1.567 3.167-1.567 2.067 0 3.166 1.333 3.166 4.1v5.9z"/>
                                </svg>
                            </Link>
                            <Link href="https://github.com/hacksphere" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.385.6.11.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.086 1.84 1.24 1.84 1.24 1.07 1.834 2.805 1.304 3.49.997.108-.776.418-1.304.762-1.604-2.665-.3-5.467-1.334-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.123-.303-.535-1.527.117-3.182 0 0 1.008-.323 3.3 1.23.96-.267 1.99-.399 3.01-.405 1.02.006 2.05.138 3.01.405 2.29-1.553 3.297-1.23 3.297-1.23.653 1.655.24 2.88.118 3.182.77.84 1.233 1.91 1.233 3.22 0 4.608-2.807 5.627-5.48 5.923.43.373.81 1.102.81 2.222 0 1.604-.014 2.896-.014 3.293 0 .32.19.694.8.575 4.77-1.586 8.207-6.083 8.207-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
            <div className="p-4 flex justify-center bg-gray-800">
                <div className="max-w-5xl text-gray-400">
                    <p>© {new Date().getFullYear()} HackSphere. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;

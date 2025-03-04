import Link from "next/link";

function CTA2() {
    return (
        <>
            <div className="grid place-items-center w-full">
                <div className="max-w-6xl py-24 px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Ready to Compete in HackSphere?</h2>
                    <p className="text-lg text-gray-600 mt-4">
                        Join the ultimate hackathon experience and showcase your innovation!
                    </p>
                    <Link href="/register">
                        <button className="mt-8 px-12 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                            Register Now 🚀
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default CTA2;

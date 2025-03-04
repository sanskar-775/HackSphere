import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
    const { token } = useSelector((state) => state.user);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            loadProfileData();
        }
    }, [token]);

    const loadProfileData = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/user/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setUserData({
                name: "Tanay Kaushal",
                emailId: "kaushaltanay37@gmail.com",
                credits: 150,
                plan: "FREE",
                progress: 75,
                eventsParticipated: 8,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center gap-4">
                {/* Profile Picture Placeholder */}
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
                    {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{userData?.name || "User"}</h2>
                    <p className="text-gray-600">{userData?.emailId || "user@example.com"}</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${userData?.progress || 0}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{userData?.progress || 0}% Profile Completed</p>
            </div>

            {/* Profile Details Table */}
            {loading ? (
                <div className="mt-6 text-center">
                    <span className="loading"></span>
                </div>
            ) : (
                <table className="table-auto w-full mt-6">
                    <tbody>
                        <tr>
                            <td className="py-2 font-medium">Name</td>
                            <td>{userData?.name}</td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">Registered Email</td>
                            <td>{userData?.emailId}</td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">Credits</td>
                            <td>{userData?.credits}</td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">Subscription</td>
                            <td>
                                {userData?.plan} Plan
                                {userData?.plan === "FREE" && (
                                    <Link href="/pricing">
                                        <button className="btn btn-primary btn-xs ml-2">Upgrade</button>
                                    </Link>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">Events Participated</td>
                            <td>{userData?.eventsParticipated || 0}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyProfile;

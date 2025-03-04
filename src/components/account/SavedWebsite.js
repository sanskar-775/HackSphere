import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PastHackathonCard from "./PastHackathonCard";

const PastEvents = () => {
    const { token } = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [pastEvents, setPastEvents] = useState([]);

    useEffect(() => {
        if (token) {
            loadPastEvents();
        }
    }, [token]);

    const loadPastEvents = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/user/pastEvents`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPastEvents(response.data.events || []);
        } catch (error) {
            console.error("Error fetching past events:", error);
            setPastEvents([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">🚀 Past Hackathons Participated</h2>

            {/* Loading State */}
            {isLoading && (
                <div className="mt-12 text-center">
                    <span className="loading"></span>
                </div>
            )}

            {/* Display Past Events */}
            {!isLoading && pastEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 mt-6">
                    {pastEvents.map((event, index) => (
                        <PastHackathonCard key={index} event={event} />
                    ))}
                </div>
            ) : (
                !isLoading && (
                    <p className="text-center text-gray-500 mt-6">No past hackathons found.</p>
                )
            )}
        </div>
    );
};

export default PastEvents;

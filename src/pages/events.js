import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyEvents = () => {
  const { token } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  const fetchEvents = async () => {
    try {
      // Replace with actual API
      // const response = await axios.get("API_URL", { headers: { Authorization: `Bearer ${token}` } });
      setEvents([
        { name: "CodeStorm", date: "Jan 20, 2024", result: "Winner" },
        { name: "WebHack", date: "Feb 5, 2024", result: "Finalist" },
      ]);
    } catch (error) {
      console.error("Error fetching events", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">My Events</h2>
      {isLoading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (
        <ul className="mt-4">
          {events.map((event, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{event.name}</strong> - {event.date} ({event.result})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;

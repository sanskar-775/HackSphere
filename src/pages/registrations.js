import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Registrations = () => {
  const { token } = useSelector((state) => state.user);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchRegistrations();
    }
  }, [token]);

  const fetchRegistrations = async () => {
    try {
      // Replace with actual API
      // const response = await axios.get("API_URL", { headers: { Authorization: `Bearer ${token}` } });
      setRegistrations([
        { event: "AI Hackathon", status: "Pending", date: "March 15, 2024" },
        { event: "CodeCamp", status: "Approved", date: "March 25, 2024" },
      ]);
    } catch (error) {
      console.error("Error fetching registrations", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">My Registrations</h2>
      {isLoading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (
        <ul className="mt-4">
          {registrations.map((registration, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{registration.event}</strong> - {registration.date} ({registration.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Registrations;

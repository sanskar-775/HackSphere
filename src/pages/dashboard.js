import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { token } = useSelector((state) => state.user);
  const [hackathons, setHackathons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchHackathons();
    }
  }, [token]);

  const fetchHackathons = async () => {
    try {
      // Replace with actual API
      // const response = await axios.get("API_URL", { headers: { Authorization: `Bearer ${token}` } });
      setHackathons([
        { name: "HackSphere 2024", date: "March 10, 2024", status: "Upcoming" },
        { name: "AIthon", date: "April 5, 2024", status: "Upcoming" },
      ]);
    } catch (error) {
      console.error("Error fetching hackathons", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Dashboard</h2>
      {isLoading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (
        <ul className="mt-4">
          {hackathons.map((hackathon, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{hackathon.name}</strong> - {hackathon.date} ({hackathon.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;

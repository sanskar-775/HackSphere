import React, { useEffect, useState } from "react";
import HackathonCard from "../components/HackathonCard";
import styles from "../styles/Hackathons.module.css"; // ✅ Import the new CSS file

const Hackathons = () => {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch("/api/hackathons") // Fetch data from the proxy route
        .then((response) => response.json())
        .then((data) => {
          setHackathons(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching hackathon data:", error);
          setLoading(false);
        });
    }, []);
  
    return (
      <div className="container">
        <h1>Upcoming Hackathons</h1>
        {loading ? (
          <p>Loading hackathons...</p>
        ) : (
          <div className={styles.hackathonGrid}> {/* ✅ Apply the correct class */}
            {hackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Hackathons;

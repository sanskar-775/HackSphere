import React, { useEffect, useState } from "react";
import HackathonCard from "../components/HackathonCard";
import HackathonCardUnstop from "../components/HackathonCardUnstop";
import styles from "../styles/Hackathons.module.css";
import { fetchHackathons } from "../utils/fetchHackathons";

const Hackathons = () => {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getHackathons = async () => {
            try {
                const hackclubData = await fetchHackathons("/api/hackathons/MLH");
                const unstopData = await fetchHackathons("/api/hackathons/unstop");

                // 🏆 Merge Both Data Sources
                setHackathons([...hackclubData, ...unstopData]);
            } catch (error) {
                console.error("Error fetching hackathon data:", error);
            } finally {
                setLoading(false);
            }
        };

        getHackathons();
    }, []);

    return (
        <div className="container">
            <h1 className="text-4xl font-bold text-center">Upcoming Hackathons</h1>
            {loading ? (
                <p>Loading hackathons...</p>
            ) : (
                <div className={styles.hackathonGrid}>
                    {hackathons.map((hackathon) =>
                        hackathon.source === "unstop" ? (
                            <HackathonCardUnstop key={hackathon.id} hackathon={hackathon} />
                        ) : (
                            <HackathonCard key={hackathon.id} hackathon={hackathon} />
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default Hackathons;

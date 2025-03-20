import React, { useEffect, useState } from "react";
import HackathonCard from "../components/HackathonCard";
import HackathonCardUnstop from "../components/HackathonCardUnstop";
import styles from "../styles/Hackathons.module.css";
import { fetchHackathons } from "../utils/fetchHackathons";
import gsap from "gsap";

const Hackathons = () => {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        function breakTheText() {
            let h1 = document.querySelector("h1");
            let h1Text = h1.textContent;
            let splittedText = h1Text.split("");
            let halfIndex = Math.floor(splittedText.length / 2);
            let clutter = "";
      
            splittedText.forEach((letter, idx) => {
              if (idx <= halfIndex) {
                clutter += `<span class="a">${letter}</span>`;
              } else {
                clutter += `<span class="b">${letter}</span>`;
              }
            });
      
            h1.innerHTML = clutter;
          }
      
          breakTheText();
      
          gsap.from("h1 .a", {
            y: 70,
            duration: 1,
            delay: 0.3,
            opacity: 0,
            stagger: 0.15,
          });
      
          gsap.from("h1 .b", {
            y: 70,
            duration: 1,
            delay: 0.3,
            opacity: 0,
            stagger: -0.15,
          });
          }, [])
          
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
        <div>
        <h1 className="text-4xl font-bold text-center glow-gradient-text p-8">Upcoming Hackathons</h1>
        <div className="w-full flex flex-col items-center">
            
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
        </div>
    );
};

export default Hackathons;

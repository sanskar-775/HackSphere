import React from "react";
import styles from "../styles/HackathonCard.module.css"; // Import CSS Module
import Link from "next/link";

const HackathonCard = ({ hackathon }) => {
  return (
    <div className={styles.card}>
      <Link href={hackathon.website} target="_blank" rel="noopener noreferrer">
      <img src={hackathon.banner} alt={hackathon.name} className={styles.cardImg} />
      <div className={styles.cardContent}>
        <h3><strong>{hackathon.name}</strong></h3>
        <p><strong>Start:</strong> {hackathon.start}</p>
        <p><strong>End:</strong> {hackathon.end}</p>
        <p><strong>Location:</strong> {hackathon.location}</p>
        <a href={hackathon.website} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm w-full mt-2">
          View Details
        </a>
      </div>
      </Link>
    </div>
  );
};

export default HackathonCard;

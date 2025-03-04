import PastHackathonCard from "src/components/account/PastHackathonCard";


const PastEvents = () => {
    // Updated hackathon data
    const pastEvents = [
        {
            id: 1,
            name: "HackSphere 2024",
            date: "Jan 15-17, 2024",
            role: "Finalist",
            ranking: "2nd Place 🥈",
            duration: "48 hours",
            description: "Developed a decentralized identity verification system and secured 2nd place."
        },
        {
            id: 2,
            name: "CodeVerse 2023",
            date: "Oct 22-23, 2023",
            role: "Winner",
            ranking: "1st Place 🏆",
            duration: "36 hours",
            description: "Built a real-time AI-driven sentiment analysis tool."
        },
        {
            id: 3,
            name: "InnovateHub 2023",
            date: "July 8-9, 2023",
            role: "Participant",
            ranking: "Top 10",
            duration: "24 hours",
            description: "Created an NFT-based digital certification system."
        },
        {
            id: 4,
            name: "TechSprint 2022",
            date: "March 12-13, 2022",
            role: "Semi-Finalist",
            ranking: "5th Place",
            duration: "24 hours",
            description: "Designed an AI-powered financial fraud detection model."
        }
    ];

    return (
        <div className="max-w-6xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800">HackSphere Past Events</h2>

            {/* Hackathon Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8 mt-8">
                {pastEvents.map((event) => (
                    <PastHackathonCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default PastEvents;

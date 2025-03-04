import { useEffect, useState } from "react";
import PageMetaTags from "@/containers/PageMetaTags";

import Link from "next/link";

export default function Events() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/hackathons");
        const data = await response.json();
        setHackathons(data.hackathons || []);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <PageMetaTags title="Upcoming Hackathons" description="Find the latest hackathons from multiple sources." url="/events" />
      <main className="container mx-auto py-8 px-2 relative">
        
        <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Hackathons</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {loading ? (
            <p className="text-gray-500">Loading hackathons...</p>
          ) : hackathons.length > 0 ? (
            hackathons.map((hackathon, index) => (
              <div key={index} className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">{hackathon.name}</h2>
                <p className="text-sm text-gray-500">{hackathon.date}</p>
                <a href={hackathon.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block">
                  View Details →
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hackathons found.</p>
          )}
        </div>
      </main>
    </>
  );
}

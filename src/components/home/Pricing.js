import CompetitionTracks from "src/common/CompetitionTracks.js";

function HackathonTracks() {
    return (
        <>
            <div className="grid place-items-center bg-slate-50 w-full">
                <div className="max-w-6xl w-full py-24 px-4 content-center justify-center">
                    <h2 className="text-3xl text-center font-bold">Explore Hackathon Tracks</h2>
                    <p className="text-center text-gray-600 mt-2">
                        Choose a challenge that fits your skills and interests.
                    </p>
                    <CompetitionTracks />
                </div>
            </div>
        </>
    );
}

export default HackathonTracks;

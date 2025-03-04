const hackathonTestimonials = [
    { 
        text: "HackSphere was an incredible experience! The mentorship and resources provided helped me push my limits and create an AI-driven solution. Can't wait for the next edition!",
        name: "Aarav, India",
        profilePic: "https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3"
    },
    { 
        text: "Participating in HackSphere opened up so many opportunities. The networking, the problem statements, and the entire vibe were just amazing!",
        name: "Sophia, Germany",
        profilePic: "https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3"
    },
    { 
        text: "The best part about HackSphere was the real-world challenges. Our team built a blockchain-based voting system, and we even got featured in a tech magazine!",
        name: "Liam, USA",
        profilePic: "https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3"
    },
];

function HackathonTestimonials() {
    return (
        <>
            <div className="grid place-items-center w-full">
                <div className="max-w-6xl px-4 py-24 content-center justify-center">
                    <h1 className="text-3xl text-center font-bold">Past Hackathon Experiences</h1>
                    <div className="grid mt-12 md:grid-cols-3 grid-cols-1 gap-8">
                        {hackathonTestimonials.map((t, k) => (
                            <div key={k} className="card w-full bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img className="mask w-20 h-20 mask-circle object-cover" src={t.profilePic} alt="Participant" />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <p>{t.text}</p>
                                    <p className="text-slate-500">-{t.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HackathonTestimonials;

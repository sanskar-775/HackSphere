import ClipboardDocumentCheckIcon from "@heroicons/react/24/outline/ClipboardDocumentCheckIcon";
import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
import DocumentMagnifyingGlassIcon from "@heroicons/react/24/outline/DocumentMagnifyingGlassIcon";
import TrophyIcon from "@heroicons/react/24/outline/TrophyIcon";

const hackathonFlow = [
    { icon: <ClipboardDocumentCheckIcon className="w-10 h-10 inline-block mr-2" />, description: "Step 1: Register for the hackathon and form your team." },
    { icon: <CodeBracketSquareIcon className="w-10 h-10 inline-block mr-2" />, description: "Step 2: Start coding! Develop your project with mentorship support." },
    { icon: <DocumentMagnifyingGlassIcon className="w-10 h-10 inline-block mr-2" />, description: "Step 3: Submit your project and get it reviewed by judges." },
    { icon: <TrophyIcon className="w-10 h-10 inline-block mr-2" />, description: "Step 4: Present your project, and winners will be announced!" },
];

function HackathonFlow() {
    return (
        
        <div className="grid place-items-center w-full" data-theme="night">
            <div className="max-w-6xl w-full py-24 px-4 content-center justify-center">
                <h2 className="text-3xl text-center font-bold">Hackathon Event Flow</h2>
                <div className="grid mt-24 md:grid-cols-4 grid-cols-1 gap-8">
                    {hackathonFlow.map((step, index) => (
                        <div key={index} className="card w-full bg-base-100 shadow-xl hover:shadow-2xl">
                            <div className="grid -mt-4 place-items-center">
                                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-100 flex font-bold justify-center items-center">
                                    <p>{index + 1}</p>
                                </div>
                            </div>
                            <div className="card-body items-center text-center">
                                <p className="text-primary">{step.icon}</p>
                                <p className="mt-2">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HackathonFlow;

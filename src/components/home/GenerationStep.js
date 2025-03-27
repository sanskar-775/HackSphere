import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15
    }
  },
  hover: {
    y: -10,
    rotate: Math.random() < 0.5 ? -1 : 1,
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 }
  },
  tap: { scale: 0.98 }
};

const numberVariants = {
  hidden: { scale: 0 },
  show: { 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 150,
      delay: 0.5
    }
  }
};

function HackathonFlow() {
    return (
        <div className="grid place-items-center w-full" data-theme="night">
            <div className="max-w-6xl w-full py-24 px-4 content-center justify-center">
                <motion.h2 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className="text-3xl text-center font-bold mb-4"
                >
                    Hackathon Event Flow
                    <motion.div 
                        className="h-1 bg-gradient-to-r from-green-500 to-blue-500 mt-2 mx-auto w-24"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </motion.h2>

                <motion.div 
                    className="grid mt-24 md:grid-cols-4 grid-cols-1 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    {hackathonFlow.map((step, index) => (
                        <motion.div 
                            key={index} 
                            className="card w-full bg-base-100 shadow-xl hover:shadow-2xl cursor-pointer relative overflow-hidden"
                            variants={cardVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-transparent opacity-0 hover:opacity-100"
                                transition={{ duration: 0.3 }}
                            />
                            
                            <div className="grid -mt-4 place-items-center">
                                <motion.div 
                                    className="w-8 h-8 rounded-full bg-amber-500 text-slate-100 flex font-bold justify-center items-center shadow-lg"
                                    variants={numberVariants}
                                >
                                    <p>{index + 1}</p>
                                </motion.div>
                            </div>
                            
                            <div className="card-body items-center text-center">
                                <motion.div 
                                    className="text-primary"
                                    whileHover={{ rotate: 15, scale: 1.1 }}
                                    transition={{ type: "spring" }}
                                >
                                    {step.icon}
                                </motion.div>
                                <motion.p 
                                    className="mt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    {step.description}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default HackathonFlow;
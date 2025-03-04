
const PastHackathonCard = ({ event }) => {
  return (
      <div className="bg-gray-50 shadow-md rounded-xl p-6 transition duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-300">
          <h3 className="text-xl font-bold text-gray-800">{event.name}</h3>
          <p className="text-sm text-gray-600 mt-1">📅 {event.date}</p>
          <p className="text-sm text-gray-600">⏳ <strong>Duration:</strong> {event.duration}</p>
          <p className="text-sm text-gray-600">🎭 <strong>Role:</strong> {event.role}</p>
          <p className="text-sm text-gray-600">🏅 <strong>Ranking:</strong> {event.ranking}</p>
          <p className="mt-3 text-gray-700">{event.description}</p>
      </div>
  );
};

export default PastHackathonCard;

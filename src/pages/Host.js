
  import { useState } from "react";
import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";

export default function HostPage() {
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    duration: "",
    prizeMoney: "",
    description: "",
  });

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Submitted:", eventDetails);
    // Integrate API Call to Save Event Data
  };

  return (
    <InnerPageContainer title="Host Your Hackathon">
      <PageMetaTags 
        title="Host Your Hackathon" 
        description="Submit details of your hackathon event including duration, prize money, and description." 
        url="/host-event"
      />
      
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Enter Hackathon Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Name */}
          <div>
            <label className="block font-semibold">Event Name</label>
            <input 
              type="text" 
              name="eventName"
              value={eventDetails.eventName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter event name"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block font-semibold">Duration (in days)</label>
            <input 
              type="number"
              name="duration"
              value={eventDetails.duration}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter duration"
              required
            />
          </div>

          {/* Prize Money */}
          <div>
            <label className="block font-semibold">Prize Money (in USD)</label>
            <input 
              type="number"
              name="prizeMoney"
              value={eventDetails.prizeMoney}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter prize money"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold">Description</label>
            <textarea 
              name="description"
              value={eventDetails.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              rows="4"
              placeholder="Enter event description"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Submit Event
          </button>
        </form>
      </div>
    </InnerPageContainer>
  );
}

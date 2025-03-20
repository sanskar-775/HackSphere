'use-client'
import { useState } from "react";
import { useRouter } from "next/router";
import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";

export default function HostPage() {
  const router = useRouter();
  const [eventDetails, setEventDetails] = useState({
    opportunityLogo: null,
    opportunityType: "hackathon",
    opportunitySubType: "",
    visibility: "public",
    opportunityTitle: "",
    organization: "",
    websiteUrl: "",
    festival: "",
    modeOfEvent: "online",
    categories: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const [isSuccess, setIsSuccess] = useState(false); // Track success/failure
  const [errorMessage, setErrorMessage] = useState(""); // Store error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventDetails({ ...eventDetails, opportunityLogo: file });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    let updatedCategories = [...eventDetails.categories];
    if (checked) {
      updatedCategories.push(value);
    } else {
      updatedCategories = updatedCategories.filter((cat) => cat !== value);
    }
    setEventDetails({ ...eventDetails, categories: updatedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  
    try {
      console.log("Submitting data:", eventDetails); // **NEW LINE 1: Log data being sent**
      const response = await fetch("/api/host-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDetails),
      });
  
      console.log("Response Status:", response.status); // **NEW LINE 2: Log server's status code**
      console.log("Response OK:", response.ok);     // **NEW LINE 3: Log if the status code is "OK" (200 range)**
  
      if (response.ok) {
        setIsSuccess(true);
        setErrorMessage("");
        console.log("Event submitted successfully!");
        // router.push("/success-page"); // Keep redirection commented out for now
      } else {
        setIsSuccess(false);
        setErrorMessage("Failed to submit event. Please try again.");
        console.error("Failed to submit event.");
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <InnerPageContainer title="Host Your Event">
      <PageMetaTags 
        title="Host Your Event" 
        description="Submit details of your event including opportunity type, visibility, and categories." 
        url="/host-event"
      />
      
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md">

        {/* Success Message */}
        {isSubmitted && isSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Event submitted successfully!
          </div>
        )}

        {/* Error Message */}
        {isSubmitted && !isSuccess && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage || "Failed to submit event. Please try again."}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Opportunity Logo */}
          <div>
            <label className="block font-semibold">Opportunity Logo *</label>
            <input 
              type="file"
              name="opportunityLogo"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg"
              accept="image/*"
              required
            />
          </div>

          {/* Opportunity Type */}
          <div>
            <label className="block font-semibold">Opportunity Type *</label>
            <select
              name="opportunityType"
              value={eventDetails.opportunityType}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="hackathon">Hackathon</option>
              <option value="workshop">Workshop</option>
              <option value="competition">Competition</option>
              <option value="webinar">Webinar</option>
            </select>
          </div>

          {/* Opportunity Sub Type */}
          <div>
            <label className="block font-semibold">Opportunity Sub Type *</label>
            <input 
              type="text"
              name="opportunitySubType"
              value={eventDetails.opportunitySubType}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter sub type"
              required
            />
          </div>

          {/* Visibility Options */}
          <div>
            <label className="block font-semibold">Visibility *</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={eventDetails.visibility === "public"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Open publicly on Unstop (Will be visible to all Unstop users)
              </label>
              <label className="flex items-center">
                <input 
                  type="radio"
                  name="visibility"
                  value="invite-only"
                  checked={eventDetails.visibility === "invite-only"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Invite Only
              </label>
            </div>
          </div>

          {/* Opportunity Title */}
          <div>
            <label className="block font-semibold">Enter Opportunity Title *</label>
            <input 
              type="text"
              name="opportunityTitle"
              value={eventDetails.opportunityTitle}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter opportunity title"
              required
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block font-semibold">Enter Your Organisation *</label>
            <input 
              type="text"
              name="organization"
              value={eventDetails.organization}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter organization name"
              required
            />
          </div>

          {/* Website URL */}
          <div>
            <label className="block font-semibold">Website URL</label>
            <input 
              type="url"
              name="websiteUrl"
              value={eventDetails.websiteUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="https://"
            />
          </div>

          {/* Festival (Optional) */}
          <div>
            <label className="block font-semibold">Festival (optional)</label>
            <input 
              type="text"
              name="festival"
              value={eventDetails.festival}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter festival name"
            />
          </div>

          {/* Mode of Event */}
          <div>
            <label className="block font-semibold">Mode of Event *</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="radio"
                  name="modeOfEvent"
                  value="online"
                  checked={eventDetails.modeOfEvent === "online"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Online Mode
              </label>
              <label className="flex items-center">
                <input 
                  type="radio"
                  name="modeOfEvent"
                  value="offline"
                  checked={eventDetails.modeOfEvent === "offline"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Offline Mode
              </label>
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block font-semibold">Categories *</label>
            <div className="space-y-2">
              {["Tech", "Coding", "Innovation", "Design", "Business"].map((category) => (
                <label key={category} className="flex items-center">
                  <input 
                    type="checkbox"
                    name="categories"
                    value={category}
                    checked={eventDetails.categories.includes(category)}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full btn btn-circle"
          >
            Next
          </button>
        </form>
      </div>
    </InnerPageContainer>
  );
}
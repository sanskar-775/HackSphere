import { useState } from "react";
import InnerPageContainer from "@/components/common/InnerPageContainer";
import PageMetaTags from "@/containers/PageMetaTags";

export default function HostPage() {
  const [eventDetails, setEventDetails] = useState({
    opportunityLogo: null,
    opportunityType: "hackathon",
    opportunitySubType: "",
    visibility: "public",
    opportunityTitle: "",
    organization: "",
    websiteUrl: "",
    festival: "",
    startDate: "",
    endDate: "",
    categories: [],
    skills: [],
    aboutOpportunity: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const requiredFieldsStep1 = [
    'opportunityLogo',
    'opportunityType',
    'opportunitySubType',
    'visibility',
    'opportunityTitle',
    'organization',
    'startDate',
    'endDate'
  ];

  const validateStep1 = () => {
    const newErrors = {};
    let isValid = true;

    requiredFieldsStep1.forEach(field => {
      if (!eventDetails[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    if (eventDetails.opportunityTitle && /\d/.test(eventDetails.opportunityTitle)) {
      newErrors.opportunityTitle = "Numbers are not allowed in this field";
      isValid = false;
    }

    if (eventDetails.organization && /\d/.test(eventDetails.organization)) {
      newErrors.organization = "Numbers are not allowed in this field";
      isValid = false;
    }

    if (eventDetails.startDate && eventDetails.endDate && new Date(eventDetails.startDate) > new Date(eventDetails.endDate)) {
      newErrors.endDate = "End date must be after start date";
      isValid = false;
    }

    setFieldErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: type === "checkbox" ? checked : value,
    });

    if (fieldErrors[name]) {
      const newErrors = { ...fieldErrors };
      delete newErrors[name];
      setFieldErrors(newErrors);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventDetails({ ...eventDetails, opportunityLogo: file });
    if (fieldErrors.opportunityLogo) {
      const newErrors = { ...fieldErrors };
      delete newErrors.opportunityLogo;
      setFieldErrors(newErrors);
    }
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

  const handleSkillChange = (e) => {
    const { value } = e.target;
    setEventDetails({ ...eventDetails, skills: value.split(",") });
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setFieldErrors({ ...fieldErrors, [name]: "This field is required" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
  
    try {
      // Validate required fields
      if (!validateStep1() || !eventDetails.aboutOpportunity || eventDetails.categories.length === 0) {
        throw new Error('Please fill all required fields');
      }
  
      const formData = new FormData();
  
      // Append all form fields
      if (eventDetails.opportunityLogo instanceof File) {
        formData.append('file', eventDetails.opportunityLogo);
      }
  
      formData.append('opportunityType', eventDetails.opportunityType);
      formData.append('opportunitySubType', eventDetails.opportunitySubType || '');
      formData.append('visibility', eventDetails.visibility);
      formData.append('opportunityTitle', eventDetails.opportunityTitle);
      formData.append('organization', eventDetails.organization);
      formData.append('websiteUrl', eventDetails.websiteUrl || '');
      formData.append('festival', eventDetails.festival || '');
      formData.append('startDate', eventDetails.startDate);
      formData.append('endDate', eventDetails.endDate);
      formData.append('categories', JSON.stringify(eventDetails.categories));
      formData.append('skills', JSON.stringify(eventDetails.skills));
      formData.append('aboutOpportunity', eventDetails.aboutOpportunity);
  
      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return JSON');
      }
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit event');
      }
  
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setEventDetails({
          opportunityLogo: null,
          opportunityType: "hackathon",
          opportunitySubType: "",
          visibility: "public",
          opportunityTitle: "",
          organization: "",
          websiteUrl: "",
          festival: "",
          startDate: "",
          endDate: "",
          categories: [],
          skills: [],
          aboutOpportunity: "",
        });
        setCurrentStep(1);
        setSubmitSuccess(false);
      }, 2000);
  
    } catch (error) {
      console.error('Error submitting event:', error);
      setSubmitError(error.message || 'Failed to submit event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <InnerPageContainer title="Host Your Event">
      <PageMetaTags 
        title="Host Your Event" 
        description="Submit details of your event including opportunity type, visibility, and categories." 
        url="/host-event"
      />
      
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md bg-base-100">
  {/* Minimalist DaisyUI Timeline with labels inside circles */}
  <div className="flex justify-center mb-10">
    <div className="flex items-center gap-0"> {/* Reduced gap */}
      {/* Step 1 */}
      <div className="flex flex-col items-center">
        <div className={`w-24 h-10 rounded-full flex items-center justify-center 
          ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-base-200 text-gray-500'}`}>
          <span className="text-sm font-medium">1 Basic Details</span>
        </div>
      </div>

      {/* Connector Line - made shorter */}
      <div className={`w-8 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-base-200'}`}></div>

      {/* Step 2 */}
      <div className="flex flex-col items-center">
        <div className={`w-28 h-12 rounded-full flex items-center justify-center 
          ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-base-200 text-gray-500'}`}>
          <span className="text-sm font-medium">2 Registration Details</span>
        </div>
      </div>
    </div>
  </div>


        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Opportunity Logo *</span>
                  </label>
                  <input 
                    type="file"
                    name="opportunityLogo"
                    onChange={handleFileChange}
                    className={`file-input file-input-bordered w-full ${fieldErrors.opportunityLogo ? 'file-input-error' : ''}`}
                    accept="image/*"
                    required
                  />
                  {fieldErrors.opportunityLogo && (
                    <label className="label">
                      <span className="label-text-alt text-error">{fieldErrors.opportunityLogo}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Opportunity Type *</span>
                  </label>
                  <select
                    name="opportunityType"
                    value={eventDetails.opportunityType}
                    onChange={handleChange}
                    className={`select select-bordered w-full ${fieldErrors.opportunityType ? 'select-error' : ''}`}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="workshop">Workshop</option>
                    <option value="competition">Competition</option>
                    <option value="webinar">Webinar</option>
                  </select>
                  {fieldErrors.opportunityType && (
                    <label className="label">
                      <span className="label-text-alt text-error">{fieldErrors.opportunityType}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Opportunity Sub Type *</span>
                  </label>
                  <input 
                    type="text"
                    name="opportunitySubType"
                    value={eventDetails.opportunitySubType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full ${fieldErrors.opportunitySubType ? 'input-error' : ''}`}
                    placeholder="Enter sub type"
                    required
                  />
                  {fieldErrors.opportunitySubType && (
                    <label className="label">
                      <span className="label-text-alt text-error">{fieldErrors.opportunitySubType}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Visibility *</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={eventDetails.visibility === "public"}
                        onChange={handleChange}
                        className="radio radio-primary"
                      />
                      <span>Open publicly (Visible to all users)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio"
                        name="visibility"
                        value="invite-only"
                        checked={eventDetails.visibility === "invite-only"}
                        onChange={handleChange}
                        className="radio radio-primary"
                      />
                      <span>Invite Only</span>
                    </label>
                  </div>
                  {fieldErrors.visibility && (
                    <label className="label">
                      <span className="label-text-alt text-error">{fieldErrors.visibility}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Opportunity Title *</span>
                  </label>
                  <input 
                    type="text"
                    name="opportunityTitle"
                    value={eventDetails.opportunityTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full ${fieldErrors.opportunityTitle ? 'input-error' : ''}`}
                    placeholder="Enter opportunity title"
                    maxLength={190}
                    required
                  />
                  {fieldErrors.opportunityTitle && (
                    <label className="label">
                      <span className="label-text-alt text-error">{fieldErrors.opportunityTitle}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Organization *</span>
                  </label>
                  <input 
                    type="text"
                    name="organization"
                    value={eventDetails.organization}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full ${fieldErrors.organization ? 'input-error' : ''}`}
                    placeholder="Enter organization name"
                    required
                  />
                  {fieldErrors.organization && (
                    <label className="label">
                      <span className="label-text-alt text-error">{fieldErrors.organization}</span>
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Start Date *</span>
                    </label>
                    <input 
                      type="date"
                      name="startDate"
                      value={eventDetails.startDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input input-bordered w-full ${fieldErrors.startDate ? 'input-error' : ''}`}
                      required
                    />
                    {fieldErrors.startDate && (
                      <label className="label">
                        <span className="label-text-alt text-error">{fieldErrors.startDate}</span>
                      </label>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">End Date *</span>
                    </label>
                    <input 
                      type="date"
                      name="endDate"
                      value={eventDetails.endDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input input-bordered w-full ${fieldErrors.endDate ? 'input-error' : ''}`}
                      required
                    />
                    {fieldErrors.endDate && (
                      <label className="label">
                        <span className="label-text-alt text-error">{fieldErrors.endDate}</span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Website URL</span>
                  </label>
                  <input 
                    type="url"
                    name="websiteUrl"
                    value={eventDetails.websiteUrl}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="https://"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Festival (optional)</span>
                  </label>
                  <input 
                    type="text"
                    name="festival"
                    value={eventDetails.festival}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Enter festival name"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button 
                  type="button"
                  onClick={handleNextStep}
                  className="btn btn-primary"
                  disabled={Object.keys(fieldErrors).length > 0}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Registration Details</h2>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Categories *</span>
                  </label>
                  <div className="space-y-2">
                    {["College Festival", "Tech", "Coding", "Innovation", "Design", "Business"].map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          name="categories"
                          value={category}
                          checked={eventDetails.categories.includes(category)}
                          onChange={handleCategoryChange}
                          className="checkbox checkbox-primary"
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                  {eventDetails.categories.length === 0 && fieldErrors.categories && (
                    <label className="label">
                      <span className="label-text-alt text-error">Please select at least one category</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Skills to be Assessed</span>
                  </label>
                  <input 
                    type="text"
                    name="skills"
                    value={eventDetails.skills.join(",")}
                    onChange={handleSkillChange}
                    className="input input-bordered w-full"
                    placeholder="Enter skills separated by commas"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">About Opportunity *</span>
                  </label>
                  <textarea
                    name="aboutOpportunity"
                    value={eventDetails.aboutOpportunity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`textarea textarea-bordered w-full ${fieldErrors.aboutOpportunity ? 'textarea-error' : ''}`}
                    placeholder="Enter details about the opportunity"
                    rows="6"
                    required
                  />
                  {fieldErrors.aboutOpportunity && (
                    <label className="label">
                      <span className="label-text-alt text-error">{fieldErrors.aboutOpportunity}</span>
                    </label>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
              <button 
                type="button"
                onClick={handlePreviousStep}
                className="btn btn-outline"
                disabled={isSubmitting}
              >
                Previous
              </button>
              <div className="relative">
                <button 
                  type="submit"
                  className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                {submitSuccess && (
                  <div className="absolute -bottom-8 left-0 right-0 text-center">
                    <span className="text-success">Event submitted successfully!</span>
                  </div>
                )}
                {submitError && (
                  <div className="absolute -bottom-8 left-0 right-0 text-center">
                    <span className="text-error">{submitError}</span>
                  </div>
                )}
              </div>
              </div>
            </>
          )}
        </form>
      </div>
    </InnerPageContainer>
  );
}
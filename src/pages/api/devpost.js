const DevpostHackathon = {
    hackathons: [],
    meta: {},
    name: "",
    founded: 0,
    members: []
  };
  
  const Hackathon = {
    id: 0,
    title: "",
    displayed_location: {},
    open_state: "",
    thumbnail_url: "",
    analytics_identifier: "",
    url: "",
    time_left_to_submission: "",
    submission_period_dates: "",
    themes: [],
    prize_amount: "",
    registrations_count: 0,
    featured: false,
    organization_name: "",
    winners_announced: false,
    submission_gallery_url: "",
    start_a_submission_url: "",
    invite_only: false,
    eligibility_requirement_invite_only_description: null,
    managed_by_devpost_badge: false
  };
  
  const DisplayedLocation = {
    icon: "",
    location: ""
  };
  
  const Theme = {
    id: 0,
    name: ""
  };
  
  const Meta = {
    total_count: 0,
    per_page: 0,
    fuzzy: false
  };
  
  const Album = {
    name: "",
    artist: {},
    tracks: []
  };
  
  const ArtistClass = {
    name: "",
    founded: 0,
    members: []
  };
  
  const Track = {
    name: "",
    duration: 0
  };
  
  module.exports = {
    DevpostHackathon,
    Hackathon,
    DisplayedLocation,
    Theme,
    Meta,
    Album,
    ArtistClass,
    Track
  };
  
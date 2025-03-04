const UnstopHackathon = {
    data: {
      current_page: 0,
      data: [],
      first_page_url: "",
      from: 0,
      last_page: 0,
      last_page_url: "",
      links: [],
      next_page_url: "",
      path: "",
      per_page: 0,
      prev_page_url: "",
      to: 0,
      total: 0
    }
  };
  
  const Datum = {
    id: 0,
    public_url: "",
    title: "",
    organization_id: 0,
    type: "",
    subtype: "",
    regn_open: 0,
    moderation_status: 0,
    self_moderated: 0,
    logoUrl2: "",
    organisation: {},
    seo_url: "",
    status: "",
    tags: [],
    thumb: null,
    banner_mobile: {},
    filters: [],
    isPaid: false,
    festival: null,
    fields: [],
    prizes: [],
    opportunity_config: {},
    seo_details: [],
    jobDetail: undefined,
    end_date: new Date(),
    start_date: new Date(),
    region: "",
    approved_date: new Date(),
    viewsCount: 0,
    registerCount: 0,
    regnRequirements: {},
    job_detail: []
  };
  
  const Banner = {
    id: null,
    filename: "",
    path: "",
    image_type: "",
    image_url: ""
  };
  
  const Prize = {
    id: 0,
    rank: "",
    cash: null,
    currency: "",
    certificate: null,
    entity_id: 0,
    entity_type: "",
    others: null,
    currencyCode: null,
    cash_postfix: null,
    max_cash: null,
    pre_placement_internship: null,
    pre_placement_opportunity: null
  };
  
  const DatumRegnRequirements = {
    opportunity_id: 0,
    start_regn_dt: new Date(),
    end_regn_dt: new Date(),
    show_deadline: 0,
    remainingDaysArray: {},
    remain_days: "",
    remaining_time: 0,
    reg_status: ""
  };
  
  const SEODetail = {
    id: 0,
    entity_id: 0,
    entity_type: "",
    title: "",
    description: "",
    keywords: "",
    event_type: null,
    event_data: null,
    public_url: null,
    sharable_image_url: ""
  };
  
  const Link = {
    url: "",
    label: "",
    active: false
  };
  
  module.exports = {
    UnstopHackathon,
    Datum,
    Banner,
    Prize,
    DatumRegnRequirements,
    SEODetail,
    Link
  };
  
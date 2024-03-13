export interface AllOrganizationCentersType {
  US?: [CenterType];
  CANADA?: [CenterType];
}

export interface CentersType {
  centers: [CenterType];
  error: object;
  requested_centers: [CenterType];
  page_info: {
    total: number;
    page: number;
    size: number;
  };
}

export interface CenterType {
  id: string;
  code: string;
  name: string;
  display_name: string;
  description: string;
  online_booking_start_date: string;
  enable_parallel_services_at_center: boolean;
  country: {
    id: string;
    code: string;
    name: string;
    phone_code: number;
    nationality: string;
  };
  state: object;
  location: object;
  currency: object;
  address_info: {
    address_1: string;
    address_2: string;
    city: string;
    zip_code: string;
  };
  settings: any;
  contact_info: object;
  working_hours: Array<any>;
  additional_info: object;
  culture_code_at_center: string;
  is_fbe_enabled: boolean;
}

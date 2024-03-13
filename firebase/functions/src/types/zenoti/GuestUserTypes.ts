export interface PersonalInfoType {
  user_name?: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  mobile_phone?: {
    country_code: number;
    number: string;
  };
  work_phone?: string | null;
  home_phone?: string | null;
  gender?: number;
  date_of_birth?: string;
  is_minor?: boolean;
  nationality_id?: number;
  anniversary_date?: string;
  lock_guest_custom_data?: boolean;
  pan?: string;
}

export interface AddressInfoType {
  address_1?: string;
  address_2?: string;
  city?: string;
  country_id?: number;
  state_id?: number;
  state_other?: string;
  zip_code?: string;
}

export interface PreferencesType {
  receive_transactional_email?: boolean;
  receive_transactional_sms?: boolean;
  receive_marketing_email?: boolean;
  receive_marketing_sms?: boolean;
  recieve_lp_stmt?: boolean;
  preferred_therapist?: string | null;
}

export interface GuestType {
  id?: string;
  code?: string;
  center_id: string;
  personal_info: PersonalInfoType;
  address_info?: AddressInfoType;
  preferences?: PreferencesType;
  tags?: string;
  referral?: string;
  primary_employee?: string;
}

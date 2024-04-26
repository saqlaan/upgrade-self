type Price = {
  currency_id: number;
  sales: number;
  tax: number;
  final: number;
};

type Service = {
  id: string;
  name: string;
  display_name: string | null;
  price: Price;
  duration: number;
  category_id: string | null;
  is_addon: boolean;
  has_addons: boolean | null;
  addons: any[] | null; // Define type if addons have a specific structure
  is_variant: boolean | null;
  has_variant: boolean | null;
  parent_service_id: string | null;
};

type AppointmentService = {
  appointment_id: string;
  invoice_item_id: string;
  cart_item_id: string | null;
  service: Service;
  requested_therapist_gender: number;
  start_time: string;
  end_time: string;
  room: any;
  equipment: any; // Define type if equipment has a specific structure
  appointment_status: number;
  requested_therapist_id: string;
  quantity: number;
  service_custom_data_indicator: string;
  actual_start_time: string | null;
  completed_time: string | null;
  progress: number;
  parent_appointment_id: string | null;
  service_custom_Data: any; // Define type if service_custom_Data has a specific structure
  item_actions: string;
  is_membership_applied: boolean;
  is_addon: boolean;
  addon_appointment_id: string | null;
  has_service_form: boolean;
  has_segments: boolean;
  segments: any[] | null; // Define type if segments have a specific structure
};

export type GuestAppointmentType = {
  appointment_group_id: string;
  no_of_guests: number;
  invoice_id: string;
  invoice_status: number;
  is_rebooking: boolean;
  notes: any; // Define type if notes have a specific structure
  center_id: string;
  appointment_services: AppointmentService[];
  appointment_packages: any[]; // Define type if appointment_packages have a specific structure
  price: Price;
  group_invoice_id: string | null;
  is_feedback_submitted: boolean;
};

type PageInfo = {
  total: number;
  page: number;
  size: number;
};

export type GuestAppointmentsResponse = {
  appointments: GuestAppointmentType[];
  page_info: PageInfo;
};

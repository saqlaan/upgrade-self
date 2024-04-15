export interface PriceInfo {
  currency_id: number;
  sale_price: number;
  tax_id: string;
  ssg: any;
  include_tax: boolean;
  demand_group_id: string;
}

export interface ZenotiService {
  id: string;
  code: string;
  name: string;
  description: string;
  duration: number;
  recovery_time: number;
  is_couple_service: boolean;
  price_info: PriceInfo;
  additional_info: any;
  catalog_info: any;
  variants_info: any;
  add_ons_info: any;
  image_paths: any;
  parallel_groups: any;
  parallel_service_groups: any;
  prerequisites_info: any;
  finishing_services_info: any;
}

export interface PageInfo {
  total: number;
  page: number;
  size: number;
}

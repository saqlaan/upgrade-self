import axios from "../config/axiosConfig";
import { AppointmentType, PageInfo, SlotType, ZenotiService } from "@/types";

interface GetServicesType {
  services: ZenotiService[];
  page_info: PageInfo;
}

export const getServices = async ({
  centerId,
  countryCode,
}: {
  centerId?: string;
  countryCode?: string;
}): Promise<GetServicesType | null> => {
  try {
    const result = await axios.get(
      `zenoti/getServices?centerId=${centerId}&countryCode=${countryCode}`,
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createAppointment = async ({
  centerId,
  countryCode,
  serviceId,
  guestId,
  date,
  invoiceItemId,
  invoiceId,
}: {
  centerId?: string;
  countryCode?: string;
  serviceId?: string;
  guestId: string;
  date: string;
  invoiceItemId?: string;
  invoiceId?: string;
}): Promise<AppointmentType | null> => {
  try {
    const result = await axios.post("zenoti/bookings", {
      centerId,
      countryCode,
      serviceId,
      guestId,
      date,
      invoiceId,
      invoiceItemId,
    });
    return result.data as AppointmentType;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSlots = async ({
  appointmentId,
  countryCode,
}: {
  appointmentId: string;
  countryCode: string;
}): Promise<{
  slots: SlotType[];
  future_days: any;
  next_available_day: any;
  Error: null;
} | null> => {
  try {
    const result = await axios.get(
      `zenoti/bookings/${appointmentId}/slots?countryCode=${countryCode}`,
    );
    return result.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

type ReserveSlotResponse = {
  is_reserved: boolean;
  error: any;
};

export const reserveSlotAsync = async ({
  appointmentId,
  countryCode,
  slotTime,
}: {
  appointmentId: string;
  countryCode: string;
  slotTime: string;
}): Promise<ReserveSlotResponse | null> => {
  try {
    const result = await axios.post(
      `zenoti/bookings/${appointmentId}/slots/reserve`,
      {
        countryCode,
        slotTime,
      },
    );
    return result.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

type ConfirmSlotResponse = {
  is_confirmed: boolean;
  error: any;
};

export const confrimSlotAsync = async ({
  appointmentId,
  countryCode,
}: {
  appointmentId: string;
  countryCode: string;
}): Promise<ConfirmSlotResponse | null> => {
  try {
    const result = await axios.post(
      `zenoti/bookings/${appointmentId}/slots/confirm`,
      {
        countryCode,
      },
    );
    return result.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

type CancelBookingResponse = {
  success: boolean;
  is_charge_applied: boolean;
};

export const cancelBooking = async ({
  invoiceId,
  countryCode,
  comments,
  reasonId,
}: {
  invoiceId: string;
  countryCode: string;
  comments: string;
  reasonId: string;
}): Promise<CancelBookingResponse | null> => {
  try {
    console.log({
      invoiceId,
      countryCode,
    });
    const result = await axios.put(
      `zenoti/invoices/${invoiceId}/cancel?countryCode=${countryCode}`,
      {
        reason_id: reasonId,
        comments: comments,
      },
    );
    return result.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

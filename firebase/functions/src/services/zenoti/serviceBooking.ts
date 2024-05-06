import axios from "../../config/axiosConfig";
import { Organization, requestHeaders } from "../../config/zenotiConfig";

export const getCenterServices = async ({
  organization,
  centerId,
  page = 1,
  size = 20,
}: {
  organization: Organization;
  centerId: string;
  page?: number;
  size?: number;
}) => {
  try {
    const response = await axios.get(`/centers/${centerId}/services`, {
      params: { page, size },
      headers: requestHeaders[organization],
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to retrieve center services");
  }
};

export const createAppointment = async ({
  organization,
  centerId,
  serviceId,
  guestId,
  date,
  invoiceId,
  invoiceItemId,
}: {
  organization: Organization;
  centerId: string;
  serviceId?: string;
  guestId: string;
  date: string; // Assuming date format is a string
  invoiceId?: string;
  invoiceItemId?: string;
}) => {
  try {
    const response = await axios.post(
      `/bookings?is_double_booking_enabled=false`,
      {
        is_only_catalog_employees: true,
        center_id: centerId,
        date,
        guests: [
          {
            id: guestId,
            items: [
              {
                item: {
                  ...(serviceId && { id: serviceId }),
                  ...(invoiceId && invoiceItemId && { invoice_id: invoiceId, invoice_item_id: invoiceItemId }),
                },
              },
            ],
          },
        ],
      },
      {
        headers: requestHeaders[organization],
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create appointment");
  }
};

export const getSlots = async ({ bookingId, organization }: { bookingId: string; organization: Organization }) => {
  try {
    const response = await axios.get(`bookings/${bookingId}/slots`, {
      headers: requestHeaders[organization],
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create appointment");
  }
};

export const reserveSlot = async ({
  bookingId,
  time,
  organization,
}: {
  bookingId: string;
  time: string;
  organization: Organization;
}) => {
  try {
    const response = await axios.post(
      `bookings/${bookingId}/slots/reserve`,
      {
        slot_time: time,
      },
      {
        headers: requestHeaders[organization],
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create appointment");
  }
};

export const confirmBooking = async ({
  bookingId,
  organization,
}: {
  bookingId: string;
  organization: Organization;
}) => {
  try {
    const response = await axios.post(
      `bookings/${bookingId}/slots/confirm`,
      {},
      {
        headers: requestHeaders[organization],
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create appointment");
  }
};

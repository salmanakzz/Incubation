import React, { useContext } from "react";
import Dashboard from "../../components/admin/dashboard/dashboard";
import { CustomContext } from "../../store/Context";

function BookingSlotPage() {
  const { setRecordTrack, setBookingSlot } = useContext(CustomContext);
  setRecordTrack(false);
  setBookingSlot(true);
  return <Dashboard />;
}

export default BookingSlotPage;

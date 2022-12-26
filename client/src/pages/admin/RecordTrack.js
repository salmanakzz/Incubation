import React, { useContext } from "react";
import Dashboard from "../../components/admin/dashboard/dashboard";
import { CustomContext } from "../../store/Context";

function RecordTrackPage() {
  const { setRecordTrack , setBookingSlot} = useContext(CustomContext);
  setBookingSlot(false)
  setRecordTrack(true);
  return <Dashboard />;
}

export default RecordTrackPage;

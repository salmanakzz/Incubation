import React, { useContext } from "react";
import Dashboard from "../../components/admin/dashboard/dashboard";
import { CustomContext } from "../../store/Context";

function DashboardPage() {
  const { setRecordTrack, setBookingSlot } = useContext(CustomContext);
  setRecordTrack(false);
  setBookingSlot(false)

  return <Dashboard />;
}

export default DashboardPage;

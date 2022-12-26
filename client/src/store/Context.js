import { createContext, useState } from "react";

export const CustomContext = createContext(null);

function Contex({ children }) {
  const [recordTrack, setRecordTrack] = useState(false);
  const [bookingSlot, setBookingSlot] = useState(false);
  return (
    <CustomContext.Provider
      value={{ recordTrack, setRecordTrack, bookingSlot, setBookingSlot }}
    >
      {children}
    </CustomContext.Provider>
  );
}

export default Contex;

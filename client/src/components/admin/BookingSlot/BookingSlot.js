import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import Axios from "../../../axios/axios";
import { registerDetails, slotBook, slotDetails } from "../../../urls/urls";

function BookingSlot() {
  const [slots, setSlots] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectSlot, setSelectSlot] = useState("");
  const [registerArray, setRegisterrray] = useState([]);

  const handleOpen = (data) => {
    setSelectSlot(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    Axios.get(slotDetails)
      .then(({ data }) => {
        setSlots(data);
      })
      .catch((err) => {
        console.log(err);
      });
    Axios.get(registerDetails)
      .then(({ data }) => {
        data.forEach((element) => {
          element.date = new Date(element.date).toDateString("en-IN");
        });
        setRegisterrray(data.filter((obj) => obj.status === "Approved"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSlotBook = (slotId, compName) => {
    Axios.patch(slotBook, { slotId, compName }).then(({ data }) => {
      const index = slots.findIndex((obj) => obj._id === slotId);
      slots[index].booked = true;
    });
  };

  return (
    <div className="booking-slot">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {slots.map((data, index) => (
            <Grid
              key={index}
              item
              xs={6}
              md={3}
              lg={2}
              sx={{ textAlign: "center" }}
            >
              <Title>{data.name}</Title>
              <Paper
                onClick={() => handleOpen(data)}
                sx={data.booked ? { p: 6, bgcolor: "#2756b0e0" } : { p: 6 }}
              ></Paper>
            </Grid>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="details-modal">
              <Title>{selectSlot.name}</Title>
              <FormControl sx={{ m: 1, minWidth: 165 }} size="small">
                <InputLabel id="demo-select-small">Select Company</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Select Company"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {registerArray.map((obj) => (
                    <MenuItem
                      onClick={() =>
                        handleSlotBook(selectSlot._id, obj.companyName)
                      }
                    >
                      {obj.companyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Modal>
        </Grid>
      </Container>
    </div>
  );
}

export default BookingSlot;

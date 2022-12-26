import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Title from "../Title/Title";
import { Button, Grid, Paper } from "@mui/material";
import Axios from "../../../axios/axios";
import { registerDetails } from "../../../urls/urls";

// Generate Registered Data

export default function RecordTrack() {
  const [registerArray, setRegisterrray] = useState([]);

  const [arr, setArr] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = (data) => {
    setArr(data);

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    Axios.get(registerDetails)
      .then(({ data }) => {
        data.forEach((element) => {
          element.date = new Date(element.date).toDateString("en-IN");
        });
        setRegisterrray(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title>Tracking Details</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Place</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registerArray.map((row, index) => (
                <>
                  <TableRow key={index}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.companyName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.city + "," + row.state}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleOpen(row)}
                        size="small"
                        variant="outlined"
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                </>
              ))}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="details-modal">
                  <Title>Details</Title>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell>Mobile Number</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Revenue</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Team</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{arr.address}</TableCell>
                        <TableCell>{arr.mobile}</TableCell>
                        <TableCell>{arr.companyType}</TableCell>
                        <TableCell>{arr.revenue}</TableCell>
                        <TableCell>{arr.desCompany}</TableCell>
                        <TableCell>{arr.desTeam}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Modal>
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

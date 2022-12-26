import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import Title from "../Title/Title";
import "./Registration.css";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import Axios from "../../../axios/axios";
import {
  changeStatus,
  processAccept,
  processReject,
  registerDetails,
} from "../../../urls/urls";

// Generate Registered Data

export default function Registration() {
  const [pendingArray, setPendingArray] = useState([]);
  const [processArray, setProcessArray] = useState([]);
  const [approvedArray, setApprovedArray] = useState([]);

  const [open, setOpen] = useState(false);

  const [arr, setArr] = useState("");

  const handleOpen = (data) => {
    setArr(data);
    setOpen(true);
  };
  const handleClose = (modal) => {
    setOpen(false);
  };

  useEffect(() => {
    Axios.get(registerDetails)
      .then(({ data }) => {
        data.forEach((element) => {
          element.date = new Date(element.date).toDateString("en-IN");
        });
        setPendingArray(data.filter((obj) => obj.status === "Pending"));
        setProcessArray(data.filter((obj) => obj.status === "Process"));
        setApprovedArray(data.filter((obj) => obj.status === "Approved"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProcess = (id, objData) => {
    Axios.patch(changeStatus, { id }).then(({ data }) => {
      if (data.status === "ok") {
        setPendingArray(pendingArray.filter((obj) => obj._id !== id));
        objData.status = "Process";
        processArray.push(objData);
      }
    });
  };

  const handleAccept = (id, objData) => {
    Axios.patch(processAccept, { id }).then(({ data }) => {
      if (data.status === "ok") {
        setProcessArray(processArray.filter((obj) => obj._id !== id));
        objData.status = "Approved";
        approvedArray.push(objData);
      }
    });
  };
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        title: "swal-delete-title",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(processReject + `?id=${id}`).then(({ data }) => {
          if (data.status === "ok") {
            setProcessArray(processArray.filter((obj) => obj._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              customClass: {
                title: "swal-delete-title",
              },
            });
          }
        });
      }
    });
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title>Application List</Title>
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
              {pendingArray.map((row, index) => (
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
                  <TableCell>
                    <FormControl
                      sx={{ minWidth: 98, fontSize: "14px" }}
                      size="small"
                    >
                      <Select
                        sx={{
                          fontSize: "14px",
                          backgroundColor: "#1976d2",
                          color: "#fff",
                          height: "2rem",
                        }}
                        value="Pending"
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem sx={{ fontSize: "14px" }} value="Pending">
                          Pending
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleProcess(row._id, row)}
                          sx={{ fontSize: "14px" }}
                          value="Process"
                        >
                          Process
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title>Process List</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Place</TableCell>
                <TableCell>Details</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  Accept / Reject
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processArray.map((row, index) => (
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
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      color="success"
                      size="small"
                      variant="contained"
                      sx={{ marginRight: "4px" }}
                      onClick={() => handleAccept(row._id, row)}
                    >
                      Accept
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      variant="contained"
                      sx={{ marginLeft: "4px" }}
                      onClick={() => handleReject(row._id)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title>Approved List</Title>
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
              {approvedArray.map((row, index) => (
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
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Modal
        open={open}
        onClose={() => handleClose("modal1")}
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
              <TableRow key={arr._id}>
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
    </React.Fragment>
  );
}

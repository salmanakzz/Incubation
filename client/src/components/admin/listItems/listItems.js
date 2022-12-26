import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SideButtons() {
  const navigate = useNavigate();

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/record_track")}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Record Track" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/booking_slot")}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Booking Slots" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div" inset></ListSubheader>
      <ListItemButton onClick={adminLogout}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
}

export default SideButtons;

// export const mainListItems = (

//   <React.Fragment>
//     <ListItemButton>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItemButton>
//     <ListItemButton >
//       <ListItemIcon>
//         <AssignmentIcon/>
//       </ListItemIcon>
//       <ListItemText primary="Record Track" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <LayersIcon />
//       </ListItemIcon>
//       <ListItemText primary="Booking Slots" />
//     </ListItemButton>
//   </React.Fragment>
// );

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <PersonIcon />
//       </ListItemIcon>
//       <ListItemText primary="Logout" />
//     </ListItemButton>
//   </React.Fragment>
// );

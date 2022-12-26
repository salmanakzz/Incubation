// admin routers

const express = require("express");
const {
  adminLogin,
  adminVerified,
  registerDetails,
  changeStatus,
  processAccept,
  processReject,
  slotDetails,
  slotBook,
} = require("../controllers/adminController");
const verifyJWT = require("../controllers/middleware");
// const verifyJWT = require("../controllers/middleware");
const router = express.Router();

// checking admin token route
router.get("/api/isAdminAuth", verifyJWT, adminVerified);

// admin login route
router.post("/api/login", adminLogin);

// fetch registerDetails route
router.get("/api/register_details", registerDetails);

// registration status change route
router.patch("/api/change_status", changeStatus);

// accept process registration route
router.patch("/api/process_accept", processAccept);

// reject process registration route
router.delete("/api/process_reject", processReject);

// fetch slots details route
router.get("/api/slot_details", slotDetails);

// slot booking route
router.patch("/api/slot_book", slotBook);

module.exports = router;

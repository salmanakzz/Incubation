// admin routes controlling

const { response } = require("express");
const adminHelper = require("../helpers/adminHelper");

// admin verified route
const adminVerified = (req, res) =>
  res.json({ status: "ok", admin: true, auth: true });

// admin login route controlling
const adminLogin = (req, res) => {
  adminHelper
    .doLogin(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

// fetching registerDetails route controlling
const registerDetails = (req, res) => {
  adminHelper
    .fetchRegisterDetails()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// registrtation status change route controlling
const changeStatus = (req, res) => {
  const { id } = req.body;
  adminHelper
    .changeStatus(id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// accept process registration route controlling
const processAccept = (req, res) => {
  const { id } = req.body;
  adminHelper
    .processAcceptRequest(id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const processReject = (req, res) => {
  const { id } = req.query;
  adminHelper
    .processRejectRequest(id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// fetch slots details route controlling
const slotDetails = (req, res) => {
  adminHelper
    .getSlotDetails()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// slot booking route controlling
const slotBook = (req, res) => {
  const { slotId, compName } = req.body;
  adminHelper
    .slotBooking(slotId, compName)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  adminVerified,
  adminLogin,
  registerDetails,
  changeStatus,
  processAccept,
  processReject,
  slotDetails,
  slotBook,
};

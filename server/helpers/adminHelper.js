// admin operations

const user = require("../config/models/userModel");
const registration = require("../config/models/registrationModel");
const slot = require("../config/models/slotModel");
const jwt = require("jsonwebtoken");

module.exports = {
  // admin find mongoose operation
  doLogin: ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      const adminDetails = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      };
      if (adminDetails) {
        if (
          adminDetails.email === email &&
          adminDetails.password === password
        ) {
          const data = {
            time: Date(),
            id: adminDetails.email,
          };
          const token = jwt.sign({ data }, process.env.JWT_SECRET, {
            expiresIn: "15m",
          });
          resolve({
            status: "ok",
            admin: true,
            token: token,
          });
        } else {
          reject({ status: "error", error: "invalid username or password" });
        }
      } else {
        reject({ status: "error", error: "admin not found" });
      }
    });
  },

  // function for fetching all registration details
  fetchRegisterDetails: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await registration.find();
        resolve(data);
      } catch (err) {
        reject({
          status: "error",
          error: "fetching registerDetails failed : " + err,
        });
      }
    });
  },

  // function for changing the status to Process
  changeStatus: (id) => {
    return new Promise((resolve, reject) => {
      registration
        .updateOne({ _id: id }, { $set: { status: "Process" } })
        .then(() => {
          resolve({ status: "ok", changeStatus: true });
        })
        .catch((err) => {
          reject({ status: "error", error: "change status failed : " + err });
        });
    });
  },

  // function for changing status to approve
  processAcceptRequest: (id) => {
    return new Promise((resolve, reject) => {
      registration
        .updateOne({ _id: id }, { $set: { status: "Approved" } })
        .then(() => {
          resolve({ status: "ok", changeStatus: true });
        })
        .catch((err) => {
          reject({ status: "error", changeStatus: false, error: err });
        });
    });
  },

  // function for delete registration
  processRejectRequest: (id) => {
    return new Promise((resolve, reject) => {
      registration
        .deleteOne({ _id: id })
        .then(() => {
          resolve({ status: "ok", deleted: true });
        })
        .catch((err) => {
          reject({ status: "error", deleted: false, error: err });
        });
    });
  },

  // function for fetching slot details
  getSlotDetails: () => {
    return new Promise(async (resolve, reject) => {
      const data = await slot.find();
      if (data) {
        resolve(data);
      } else {
        reject({ status: "error", fetchSlotDetails: false });
      }
    });
  },

  // function for slot booking
  slotBooking: (slotId, compName) => {
    return new Promise((resolve, reject) => {
      slot
        .updateOne(
          { _id: slotId },
          { $set: { booked: true, companyName: compName } }
        )
        .then(() => {
          resolve({ status: "ok", booked: true });
        })
        .catch((err) => {
          reject({ status: "error", booked: false, error: err });
        });
    });
  },
};

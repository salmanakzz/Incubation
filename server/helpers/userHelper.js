// user operations

const user = require("../config/models/userModel");
const registration = require("../config/models/registrationModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // user insert mongoose operation
  doRegister: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      await user
        .create(userData)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // user find mongoose operation
  doLogin: ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      const userDetails = await user.findOne({ email });

      if (userDetails) {
        bcrypt.compare(password, userDetails.password).then((status) => {
          if (status) {
            const data = {
              time: Date(),
              id: userDetails._id,
            };
            const token = jwt.sign({ data }, process.env.JWT_SECRET, {
              expiresIn: "15m",
            });
            resolve({
              status: "ok",
              user: true,
              token: token,
              result: userDetails,
            });
          } else {
            reject({ status: "error", error: "invalid username or password" });
          }
        });
      } else {
        reject({ status: "error", error: "user not found" });
      }
    });
  },

  // company registration insert operations
  companyRegister: (registerData) => {
    return new Promise(async(resolve, reject) => {
      registerData.status = "Pending";
      registerData.date = new Date()
      await registration
        .create(registerData)
        .then(() => {
          resolve({ status: "ok", compRegistered: true });
        })
        .catch((err) => {
          reject({
            status: "error",
            compRegistered: false,
            error: "database storing failed" + err,
          });
        });
    });
  },
};

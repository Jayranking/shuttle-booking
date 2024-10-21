const Vehicle = require("../models/register_vehicle");
const User = require("../models/user");
const bcrypt = require('bcrypt');


module.exports = {
  get_dashboard: (req, res) => {
    res.render("./driverViews/dashboard.ejs");
  },

  get_vehicle: async(req, res) => {
    const context = {};
    try {
      const _vehicle = await Vehicle.find();
      context['vehicle'] = _vehicle;
      console.log(_vehicle);
      
      res.render("./driverViews/vehicle.ejs", {context, res});
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  },

  register_vehicle: (req, res) => {
    res.render("./driverViews/register_vehicle.ejs");
  },
  post_vehicle: async (req, res) => {
    const { vehicle_model, plate_no, amount, description } = req.body;

    const vehicle_modelReg = /\b[A-Za-z0-9\-]+\b/;
    const plate_noReg = /^[A-Za-z0-9]{1,3}\s?[A-Za-z0-9]{1,4}$/;
    const amountReg = /^[0-9]+$/;
    const descriptionReg = /^[a-zA-Z0-9\s,.'()\-!]+$/;

    try {
      // const img = req.file.filename;
      const img = req.file ? req.file.filename : null;

      if (!vehicle_modelReg.test(vehicle_model)) {
        throw new Error("Invalid vehicle name format");
      }

      if (!plate_noReg.test(plate_no)) {
        throw new Error("Invalid plate number format");
      }

      if (!img) {
        throw new Error("Upload Vehicle image");
      }

      if (!amountReg.test(amount)) {
        throw new Error("Enter a reasonable amount");
      }

      if (!descriptionReg.test(description)) {
        throw new Error("Type your description correctly!");
      }

      // db
      const vehicle = await Vehicle.create({
        vehicle_model,
        plate_no,
        img,
        amount,
        description,
      });
      console.log(vehicle);

      return res.status(200).json({
        success: true,
        msg: "Vehicle published successfully!",
        redirectURL: "/vehicle",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  bookings: async(req, res) => {
    const context = {};
    try {
      // const _vehicle = await Vehicle.find();
      // context['vehicle']
      res.render("./driverViews/orders.ejs");
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },

  change_password: (req, res) => {
    res.render("./driverViews/change_password.ejs");
  },
  changePassword: async (req, res) => {
    const { oldPwd, newPwd } = req.body;
  
    try {
      // Fetch the driver document using the driver's ID from the token
      const driver = await User.findById(req.driver);
      if (!driver) {
        throw new Error('Driver not found');
      }
  
      // Compare old password with the hashed password stored in the database
      const auth = await bcrypt.compare(oldPwd, driver.password);
      if (!auth) {
        throw new Error('Incorrect old password');
      }
  
      // Validate the new password pattern
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+\[\]{}|;:,.<>?]).{8,}$/;
      if (!passwordPattern.test(newPwd)) {
        throw new Error('New password does not meet the criteria');
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt();
      const hashedNewPwd = await bcrypt.hash(newPwd, salt);
  
      // Update the driver's password in the database
      await User.findByIdAndUpdate(req.driver, { password: hashedNewPwd });
  
      return res.status(200).json({
        success: true,
        msg: 'Password changed successfully',
        redirectURL: '/dashboard'
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  
  profile: async(req, res) => {
    const context = {};
    try {
      const _driver = await User.findOne();
      context['driver'] = _driver
      console.log(_driver);
       
     return res.render("./driverViews/profile", {context, res});
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },
}; 

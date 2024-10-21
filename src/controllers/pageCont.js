const Vehicle = require('../models/register_vehicle');
const Booking = require('../models/booking');

module.exports = {
    get_home: async(req, res) => {
      const context = {};
      try {
        const _shuttles = await Vehicle.find();
        context['shuttles'] = _shuttles;
        console.log(_shuttles);
        return res.render('./index', {context, res});
      } catch (error) {
        return res.status(500).json({error: error.message})
      }
    },

    get_shuttles: async(req, res) => {
      const context = {};
      try {
        const _shuttles = await Vehicle.find();

        context['shuttles'] = _shuttles;
        console.log(_shuttles);
        return res.render('./shuttle', {context, res});
      } catch (error) {
        return res.status(500).json({error: error.message})
      }
    },

    get_register: (req, res) => {
        res.render('./register');
    },

    get_login: (req, res) => {
        res.render('./login');
    },

    details: (req, res) => {
        res.render('./details');
    },

    booking: (req, res) => {
        res.render('./booking')
    },

    post_booking: async(req, res) => {
        const {full_name, phone_no, email, passenger, date, time, location, destination} = req.body;

        const full_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        const phone_noReg = /^[0-9]+$/;
        const emailReg = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;
        const locationReg = /^[a-zA-Z0-9\s,'-]+$/;
        
        try {
            if (!full_nameReg.test(full_name)) {
                throw new Error("Invalid fullname format");
              }
            
              if (!phone_noReg.test(phone_no)) {
                throw new Error("Invalid phone number input");
              }
            
              if (!emailReg.test(email)) {
                throw new Error("Invalid email input");
              }

              if (passenger == "") {
                throw new Error("Select number of passangers")
              }
            
              if (date == "") {
                throw new Error("Select date");
              }
            
              if (time == "") {
                throw new Error("Select time for pickup");
              }
            
              if (!locationReg.test(location)) {
                throw new Error("Enter Location you are right now!");
              }
            
              if (!locationReg.test(destination)) {
                throw new Error("Enter where you are going");
              }
 
            //   insert to db
            const booking = await Booking.create({
                full_name,
                phone_no,
                email,
                passenger,
                date,
                time,
                location,
                destination
            });
            console.log(booking);

            return res.status(200).json({
                success: true,
                msg: "Booking successful!",
                redirectURL: "/booking"
            });
        } catch (error) {
            return res.status(500).json({error: error.message})
        }

    },

    ticket: async(req, res) => {
      const context = {};
      try {
        const _booking = await Booking.find();
        context['booking'] = _booking;

        const _driver = await User.findOne();
        context['driver'] = _driver
        
       return res.render('./ticket', {context, res});
      } catch (error) {
        return res.status(500).json({error: error.message})
      }
    }
}
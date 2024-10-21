const User = require("../models/user");
const jwt = require('jsonwebtoken');


module.exports = {
  register: async (req, res) => {
    const { full_name, username, phone_no, email, date, password } = req.body;

    console.log(req.body);

    const full_nameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const usernameReg = /^[a-zA-Z][a-zA-Z0-9_.]{2,19}$/;
    const phone_noReg = /^[0-9]+$/;
    const emailReg = /^[a-z0-9]([a-z0-9_\.\-])*\@(([a-z0-9])+(\-[a-z0-9]+)*\.)+([a-z0-9]{2,4})/;
    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    try {
      if (!full_nameReg.test(full_name)) {
        throw new Error("Invalid fullname format");
      }

      if (!usernameReg.test(username)) {
        throw new Error("Invalid username format");
      }

      if (!phone_noReg.test(phone_no)) {
        throw new Error("Invalid phone number input");
      }

      if (!emailReg.test(email)) {
        throw new Error("Invalid email input");
      }

      if (date == "") {
        throw new Error("Select today's date");
      }

      if (!passwordReg.test(password)) {
        throw new Error("Invalid password input");
      }

      const img = req.file.filename;

      // create user and add to db
      const user = await User.create({
        full_name,
        username,
        phone_no,
        email,
        img,
        date,
        password,
      });
      console.log(user);

      return res.status(200).json({
        success: true,
        msg: "Account Created Successfully!",
        redirectURL: `/login`,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    const { phone_no, password } = req.body;

    // regex for input
    const phone_noReg = /^0[1-9]\d{9}$/;
    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+\[\]{}|;:,.<>?]).{8,}$/;

    try {
      // if statements
      if (!phone_noReg.test(phone_no)) {
        throw new Error("Incorrect phone number");
      }

      if (!passwordReg.test(password)) {
        throw new Error("Incorrect password");
      }

      const isLoggedIn = await User.login(phone_no, password)

      if (isLoggedIn) {
        // Generate JWT 
        const token =  jwt.sign({id: isLoggedIn._id}, process.env.TOKEN_SECRET, {expiresIn: 4000 * 60 * 60 * 24})
        
        // send JWT to cookie
        res.cookie('jwt', token, {maxAge: 4000 * 60 * 60 * 24})

        return res.status(200).json({
          success: true,
          msg: 'Login Successfully',
          redirectURL : '/dashboard',
          user: isLoggedIn
        });
      }else{
        throw new Error('Invalid phone number or password')
      }
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  },

  user_logout: (req, res) => {
    res.cookie('jwt', "", {maxAge: 4});
    res.redirect('/login')
  }
};

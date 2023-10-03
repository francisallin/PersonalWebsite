const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

exports.register = async (req, res, next) => {
  const { username, password } = req.body
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" })
  }
  bcrypt.hash(password, 10)//10 = hash the pw 10 times
  .then(async (hash) => { 
    await User.create({
      username,
      password: hash,
    })
    const maxAge = 3 * 60 * 60; // 3hrs in sec
    const token = jwt.sign(
      { id: User._id, username, role: User.role },
      jwtSecret,
      {
        expiresIn: maxAge, 
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3hrs in ms
    });
    res.status(201).json({
      message: "User successfully created",
      user: user._id,
    });
  })
  .catch((error) =>
    res.status(400).json({
      message: "User not successful created",
      error: error.message,
    })
  );
}
exports.login = async (req, res, next) => {
  const { username, password } = req.body
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      })
    } 
      // comparing given password with hashed password
      bcrypt.compare(password, user.password)
      .then((result)=>{
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, 
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully Logged in",
            user: user._id,
        });
      } else {
        res.status(400).json({ message: "Login not succesful" });
      }
    });
} catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}
// exports.adminAuth = (req, res, next) => {
//   const token = req.cookies.jwt
//   console.log(req.cookies)
//   console.log(token)
//   if (token) {
//     jwt.verify(token, jwtSecret, (err, decodedToken) => {
//       if (err) {
//         return res.status(401).json({ message: "Not authorized" })
//       } else {
//         if (decodedToken.role !== "admin") {
//           return res.status(401).json({ message: "Not authorized" })
//         } else {
//           next()
//         }
//       }
//     })
//   } else {
//     return res
//       .status(401)
//       .json({ message: "Not authorized, token not available" })
//   }
// }
// exports.userAuth = (req, res, next) => {
//   const token = req.cookies.jwt
//   if (token) {
//     jwt.verify(token, jwtSecret, (err, decodedToken) => {
//       if (err) {
//         return res.status(401).json({ message: "Not authorized" })
//       } else {
//         if (decodedToken.role !== "Basic") {
//           return res.status(401).json({ message: "Not authorized" })
//         } else {
//           next()
//         }
//       }
//     })
//   } else {
//     return res
//       .status(401)
//       .json({ message: "Not authorized, token not available" })
//   }
// }
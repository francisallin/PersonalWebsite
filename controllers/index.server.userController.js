const User = require('../models/user.models');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
//const jwtSecret = '12e351e26b6a8fb310347be9662c8486ff2d8e4939549f7e859bcc2d74fe8d2263c2b6';

exports.register = async (req, res) => {
    try {
      // Get user input
      const { username, password, email } = req.body;
  
      // Validate user input
      if (! username && password && email ) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ username });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        username,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.jwtSecret,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
}
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if username and password is provided
        if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })}
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, username },
            process.env.jwtSecret,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      }
      catch(error){
        res.status(500).send({
            'message': 'Something went wrong',
            'error' : error.message
        })        
      }

};
    // User.find({ name: req.body.username, password: req.body.password})
    // .then(User => {
    //     if (!User){
    //         res.status(404).send({'message': 'user not found'});
    //         res.render('login', { error: 'Invalid username or password' });
    //     }
    //     else 
    //         res.redirect('/businessContacts');
    // })
    // .catch(error => {
    //     res.status(500).send({
    //         'message': 'Something went wrong',
    //         'error' : error
    //     })
    // })// create user
// Disabled to comment once user created
// exports.create = (req, res) => {
//     if(!req.body.username || !req.body.password){
//         return res.status(400).send({
//             'message': "Incomplete record"
//         }); 
//     }
//     const user = new User({
//         username : req.body.username,
//         password : req.body.password
//     })
//     user.save()
//     .then(data => res.send(data))
//     .catch(error => {
//         res.status(500).send({
//             'message': 'Something went wrong',
//             'error' : error
//         })
//     })
// }

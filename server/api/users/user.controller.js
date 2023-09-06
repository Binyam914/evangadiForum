const { register, getAllUsers, userById, getUserByEmail, profile } = require('./user.service');
//Importing bcryptJs module to use password encryption
const bcrypt = require('bcryptjs');
//Importing database structure 
const pool = require('../../config/database');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const { userName, firstName, lastName, email, password } = req.body;

        // firstname = cleaner(data.firstName); <?php echo ?> 

        //validation 
        if (!userName || !firstName || !lastName || !email || !password)
            return res.status(400).json({ msg: 'Not all fields have been provided!' })
        if (password.length < 8)
            return res
                .status(400)
                .json({ msg: 'Password must be at least 8 characters!' })
        pool.query('SELECT * FROM registration WHERE user_email = ?',
            [email],
            (err, results) => {
                if (err) {
                    return res
                        .status(err)
                        .json({ msg: "database connection err" })
                }
                if (results.length > 0) {
                    return res
                        .status(400)
                        .json({ msg: "An account with this email already exists!" });
                } else {
                    //password encryption
                    const salt = bcrypt.genSaltSync();
                    req.body.password = bcrypt.hashSync(password, salt);

                    //sending data to register
                    register(req.body, (err, results) => {
                        if (err) {
                            console.log(err);
                            return res
                                .status(500)
                                .json({ msg: "database connection err" });
                        }
                        pool.query('SELECT * FROM registration WHERE user_email = ?',
                            [email],
                            (err, results) => {
                                if (err) {
                                    return res
                                        .status(err)
                                        .json({ msg: "database connection err" })
                                }
                                req.body.userId = results[0].user_id;
                                console.log(req.body);
                                profile(req.body, (err, results) => {
                                    if (err) {
                                        console.log(err);
                                        return res
                                            .status(500)
                                            .json({ msg: "database connection err" });
                                    }
                                    return res.status(200).json({
                                        msg: "New user added successfully",
                                        data: results
                                    })
                                })
                            }
                        );
                    })
                }
            })
    },
    getUsers: (req, res) => {
        getAllUsers((err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: "database connection err" });
            }
            return res.status(200).json({ data: results });
        })
    },
    getUserById: (req, res) => {
        // const id = req.params.id;
        // console.log("id===>",id,"user===>",req.id);
        userById(req.id, (err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: "database connection err" })
            }
            if (!results) {
                return res.status(404).json({ msg: "Record not found" });
            }
            return res.status(200).json({ data: results })
        })
    },
    login: (req, res) => {
        const { email, password } = req.body;
        //validation
        if (!email || !password)
            return res
                .status(400)
                .json({ msg: 'Not all fields have been provided!' })
        getUserByEmail(email, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ msg: "database connection err" })
            }
            if (!results) {
                return res
                    .status(404)
                    .json({ msg: "No account with this email has been registered" })
            }
            const isMatch = bcrypt.compareSync(password, results.user_password);
            if (!isMatch)
                return res
                    .status(404)
                    .json({ msg: "Invalid Credentials" })
            const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.json({
                token,
                user: {
                    id: results.user_id,
                    display_name: results.user_name
                }
            })
        })
    },
    forgetPassword: (req, res) => { 
        const { email } = req.body;
        res.send(email);
        console.log(email);
    // check the email is alredy taken
    
    // connection.query('SELECT * FROM registration WHERE user_email = ?',
    //   [email],
    //   (err, results) => {
    //     if (err) {
    //       return res
    //         .status(err)
    //         .json({ msg: "database connection err during email checking" })
    //     }
    //     if (results.length == 0) {
    //       return res
    //         .status(400)
    //         .json({ msg: "no account with this email" });
    //     }
      
         
          
    //      //  sending code
    //      let v_code = generateRandomSixDigitNumber();
    //     sendEmail(email, v_code);
    //     verify_data= {
    //         email,
    //         v_code,
    //       }
    //     res.send({state: 'success' ,msg: `code sent to your email` });
    //      console.log(verify_data);

    //   })

    },

     confimCode: (req, res) => { 
    const { v_code } = req.body; 
    if (v_code == verify_data.v_code) { 
      res.send({state: 'success' ,msg: `confimed` });
    }

    res.status(400)
            .json({ msg: "incorrect v_code" });
    },

    changePassword: (req, res) => { 
    const { new_password, c_password, email } = req.body; 
    console.log(req.body);
    if (new_password !== c_password) { 
      res.status(400)
            .json({ msg: "password and c_password has to be the same" });

    }

    //password encryption
    const salt = bcrypt.genSaltSync();
    req.body.new_password = bcrypt.hashSync(new_password, salt);

     userService.changepass(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: "database connection err" });
            }
            return res.status(200).json({
                msg: "password changed successfully",
                data: results
            })
        })




    },

    

}


const  generateRandomTwoDigitNumber =()=> {
  return Math.floor(Math.random() * 90 + 10);
}

const generateRandomSixDigitNumber = () => {
  return Math.floor(Math.random() * 900000 + 100000);
};


const validatePassword = (password)=> {
  const errors = [];

  // Validate password length
  if (!/.{8,}/.test(password)) {
    errors.push('Password must be at least 8 characters long.');
  }

  // Validate uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter.');
  }

  // Validate lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter.');
  }

  // Validate digit
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one digit.');
  }

  // Validate special character
  if (!/[$@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character.');
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors: errors
    };
  }

  return {
    valid: true
  };
}

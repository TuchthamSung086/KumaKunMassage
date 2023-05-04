const User = require("../models/User");
const transporter = require("../config/mailer");

//@ desc        Register User
//@route        POST /api/v1/auth/register
//@access       Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, tel } = req.body;

    // If email in DB, don't continue
    if (!User.find({ email: email })) {
      return res.status(409).json({ success: false, message: "This email is already used." });
    }

    //Create User
    const user = await User.create({
      name,
      email,
      password,
      role,
      tel,
    });

    // Create token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({ success: true, token });
    if (user) {
      await sendVerificationEmail(user, req);
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, err: err });
    console.log(err.stack);
  }
};

exports.verify = async (req, res) => {
  if (!req.params.token) {
    return res.status(400).json({ success: false, msg: "No token provided" });
  }

  const user = await User.findOneAndUpdate(
    { verificationToken: req.params.token },
    { isVerified: true }
  );

  if (!user) {
    return res.status(400).json({ success: false, msg: "Invalid token" });
  }

  if (user.isVerified) {
    return res
      .status(400)
      .json({ success: false, msg: "User is already verified" });
  }

  return res.status(200).json({ success: true, msg: "Verify user" });
};

//@desc         Login User
//@route        POST /api/v1/auth/login
//@access       Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validate email & password
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide an email and password" });
    }

    //Check for user
    const user = await User.findOne({ email }).select("password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "Invalid credentials" });
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });
    }

    //Create token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({ success: true, token });
    sendTokenResponse(user, 200, res);
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: "Cannot convert email or password to string",
    });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expire: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    // Add for frontend
    _id: user._id,
    name: user.name,
    email: user.email,
    // End for frontend
    token,
  });
};

// Send email for account verification
const sendVerificationEmail = async (user, req) => {
  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/verify/${user.verificationToken}`;

  const message = `Please verify your account by clicking the link: \n\n ${verificationUrl}`;

  console.log("Sending Email to ", user.email);
  console.log("Message BEGIN ===");
  console.log(message);
  console.log("Message END ===");

  return await transporter.sendMail({
    from: "Domingo Ward <domingo.ward@ethereal.email>",
    to: user.email,
    subject: "Account Verification Token",
    text: message,
  });
};

// At the end of file
//@desc Get current Logged in user
//@route POST /api/v1/auth/me
//@access Private
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
};

//@desc     Log user out / clear cookie
//@route    GET /api/v1/auth/logout
//@access   Private
exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  }); // scroll
};

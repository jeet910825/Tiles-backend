const jwt = require("jsonwebtoken");

const sendToken = (user, res) => {
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "1h",
      algorithm: "HS512", // Use a strong encryption algorithm
    }
  );
  res.cookie("token", token, {
    httpOnly: false,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: true,
  });
  res
    .status(200)
    .json({ success: true, user: { token: token, isAdmin: user.isAdmin } });
};

module.exports = sendToken;

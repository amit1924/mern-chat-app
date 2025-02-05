import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // in milliseconds format
    httpOnly: true, // prevent xss attacks cross-site scripting attacks
    sameSite: "strict", //CSRF attacks are not allowed
    secure: process.env.NODE_ENV !== "development", // false in case of development
  });
};

export default generateTokenAndSetCookie;

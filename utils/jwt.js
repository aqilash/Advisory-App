import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signAuthToken = (user, req, res) => {
  const token = jwt.sign(
    { user_id: user.id, email: user.email, role_type: user.role_type },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  return token;
};

export const verifyAuthToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

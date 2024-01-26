import * as jwt from "../utils/jwt.js";
import dotenv from "dotenv";
import ErrorHandler from "../utils/errorHandler.js";

dotenv.config();

export default async (req, res, next) => {
  try {
    let token;
    const tokenType = "Bearer";

    if (
      req.headers["authorization"] &&
      req.headers["authorization"].startsWith(tokenType)
    ) {
      token = req.headers["authorization"].split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new ErrorHandler("Access token is required", 401, "fail"));
    }

    const decoded = jwt.verifyAuthToken(token);
    req.user = decoded;
    next();
  } catch (e) {
    next(e);
  }
};

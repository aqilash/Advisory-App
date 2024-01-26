import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";
import * as jwt from "../utils/jwt.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createUser = async (req, res, next) => {
  try {
    const data = req.body;

    const saltRounds = 12;
    data.password = await bcrypt.hash(data.password, saltRounds);

    const newUser = await prisma.user.create({
      data,
    });

    const token = jwt.signAuthToken(newUser, req, res);

    res.status(200).json({
      status: res.statusMessage || "User Created",
      data: { ...newUser, token },
    });
  } catch (e) {
    next(e);
  }
};

export const renderLogin = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    console.log("JWT Cookie cleared");
    res.render("admin/login");
  } catch (e) {
    next(e);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body.user;

    // 1 Check if email and password exist
    if (!email || !password) {
      return next(
        new ErrorHandler("Please provide email and passowrd!", 400, "fail")
      );
    }

    // 2 check if user exists && password is correct
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new ErrorHandler("Incorrect email or password", 401, "fail"));
    }
    user.password = undefined;

    //3 if everything ok, send JWT token to user
    const token = jwt.signAuthToken(user, req, res);
    res.redirect("/listing");
  } catch (e) {
    next(e);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const password = req.query.password;
    const email = decodeURIComponent(req.query.email);

    // 1 Check if email and password exist
    if (!email || !password) {
      return next(
        new ErrorHandler("Please provide email and passowrd!", 400, "fail")
      );
    }

    // 2 check if user exists && password is correct
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new ErrorHandler("Incorrect email or password", 401, "fail"));
    }
    user.password = undefined;

    //3 if everything ok, send JWT token to user
    const token = jwt.signAuthToken(user, req, res);
    const decoded = jwt.verifyAuthToken(token);

    res.status(200).json({
      status: res.statusMessage || "Logged in",
      result: {
        user_id: decoded.user_id,
        access_token: token,
        token_type: "Bearer",
        role_type: decoded.role_type,
        expires_at: decoded.exp,
      },
    });
  } catch (e) {
    next(e);
  }
};

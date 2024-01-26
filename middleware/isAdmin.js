import ErrorHandler from "../utils/errorHandler.js";

export default (req, res, next) => {
  if (req.user.role_type !== "a") {
    return next(
      new ErrorHandler(
        "You do not have permission to perform this action",
        403,
        "fail"
      )
    );
  }
  next();
};

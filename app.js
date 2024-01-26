import express from "express";
import dotenv from "dotenv";
import methodOverride from "method-override";
import ErrorHandler from "./utils/errorHandler.js";
import listingRouter from "./routes/listingRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/auth", authRouter);
app.use("/listing", listingRouter);

app.all("*", (req, res, next) => {
  next(new ErrorHandler("Page Not Found", 404, "fail"));
});
app.use((err, req, res, next) => {
  console.log(err.stack);

  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status,
    message,
  });
});

app.listen(port, () => {
  console.log(`Advisory App listening on port ${port}`);
});

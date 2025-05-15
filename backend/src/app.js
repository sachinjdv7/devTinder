const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDb } = require("./config/database");
require("dotenv").config();
require("./utils/cron-job");

const app = express();
const PORT = process.env.PORT ?? 7777;

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routers
const {
  authRouter,
  profileRouter,
  connectionRequestRouter,
  userRouter,
} = require("./routers");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);
app.use("/", userRouter);

connectDb()
  .then(() => {
    app.on("error", (error) => {
      console.log("Express server connection failed ", error);
    });
    app.listen(PORT, () => {
      console.log(`🚀 Express server is listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection failed to connect MongoDB", error);
  });

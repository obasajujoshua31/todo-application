/* eslint-disable require-jsdoc */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import redis from "redis";
import axios from "axios";
import passport from "passport";
import router from "./routes/index";
import { REDIS_PORT } from "./config/db";
import configurePassport from "./middlewares/passport";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.disable("x-powered-by");
app.use(cors());
app.use(passport.initialize());
configurePassport(passport);
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome To our Todo Application</h1>");
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log("Server Started at port ", port);
});

export default app;

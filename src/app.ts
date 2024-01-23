import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import api_route from "./routes/index";
import cors from "cors";
import passport from "./auth/passport";
import Server from "./config/server";
const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://sorobanlearn.com",
      /\.netlify.app$/,
    ],
    credentials: true,
  })
);
app.use(cookieParser());

// app.use(helmet());
app.use(passport.initialize());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", api_route);

Server(app);

export default app;

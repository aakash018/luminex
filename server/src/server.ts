import express from "express";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth from "./api/auth";
import { validateUser } from "./middleware/validateUser";
const app = express();
const PORT = 5000;

export const prisma = new PrismaClient();

// Create an S3 service client object.

// Create a local .txt file with conte
// createLocalTxtFile();

// Upload the created file to S3
// uploadFileToS3();

// Function to get the URL of an object in S3

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", auth);

app.get("/", validateUser, (_, res) => {
  res.json({
    status: "ok",
    message: "server running",
  });
});

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING AT", PORT);
});

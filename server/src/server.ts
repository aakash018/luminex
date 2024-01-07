import express from "express";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth from "./api/auth";
import { validateUser } from "./middleware/validateUser";
import book from "./api/bookUpload";

import http from "http";
import { Server } from "socket.io";
import {
  getReadingLocations,
  setReadingLocation,
} from "./utils/userReadingLocation";

const app = express();
const PORT = 5000;

export const prisma = new PrismaClient();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ENDPOINT,
  },
});

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on(
    "cfiPosition",
    (data: {
      userId: string;
      loc: string;
      bookId: string;
      progress: number;
    }) => {
      setReadingLocation(
        socket.id,
        data.loc,
        data.userId,
        data.bookId,
        data.progress
      );
      console.log(getReadingLocations(socket.id));
    }
  );

  socket.on("disconnect", async () => {
    try {
      await prisma.book.update({
        where: {
          id: getReadingLocations(socket.id).bookId,
        },
        data: {
          location: getReadingLocations(socket.id).loc,
          progress: getReadingLocations(socket.id).progress,
        },
      });
    } catch (e) {
      console.log(e);
    }
  });
});

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

app.use("/auth", auth);
app.use("/book", book);

app.get("/", validateUser, (_, res) => {
  console.log("SERVER RUNNING");
  res.json({
    status: "ok",
    message: "server running",
  });
});

server.listen(PORT, () => {
  console.log("SERVER IS RUNNING AT", PORT);
});

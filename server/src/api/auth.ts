import express from "express";
import { LoginPayload, SignupPayload } from "types/auth";
import jwt from "jsonwebtoken";
import { prisma } from "../server";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../tokenCreate";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const payload = req.body as SignupPayload;

  if (
    payload.username.trim() === "" ||
    payload.email.trim() === "" ||
    payload.password.trim() === "" ||
    payload.fullname.trim() === ""
  ) {
    return res.json({
      status: "fail",
      message: "empty fields",
    });
  }

  try {
    const hashPassword = await bcrypt.hash(payload.password, 12);

    await prisma.user.create({
      data: {
        email: payload.email,
        username: payload.username,
        password: hashPassword,
        name: payload.fullname,
      },
    });

    return res.json({
      status: "ok",
      message: "user created",
    });
  } catch (e) {
    console.log(e);

    if (e.code === "P2002") {
      return res.json({
        status: "fail",
        message: "user or email already registered",
      });
    }

    return res.json({
      status: "fail",
      message: "error",
    });
  }

  res.send("done");
});

router.post("/login", async (req, res) => {
  const payload = req.body as LoginPayload;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (!user) {
      return res.json({
        status: "fail",
        message: "user doesn't exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      payload.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.json({
        status: "fail",
        message: "password incorrect",
      });
    }

    const { password, ...userToSend } = user;

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    res.cookie("rid", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({
      status: "ok",
      message: "user found",
      user: userToSend,
      accessToken,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      status: "fail",
      message: "error trying to retrieve user",
    });
  }
});

router.get("/refresh-token", async (req, res) => {
  const cookie = req.cookies as { rid: string };

  try {
    const isValid = jwt.verify(cookie.rid, process.env.REFRESH_TOKEN_SECRET);
    if (typeof isValid !== "string") {
      const user = await prisma.user.findUnique({
        where: {
          id: isValid.userId,
        },
      });

      if (user) {
        const accessToken = createAccessToken(user);

        res.json({
          status: "ok",
          message: "new token retrieved",
          accessToken,
        });
      } else {
        throw "bad token";
      }
    } else {
      throw "bad token";
    }
  } catch {
    res.json({
      status: "fail",
      message: "bad refresh token",
    });
  }
});

export default router;

import express from "express";
import { validateUser } from "../middleware/validateUser";
import { prisma } from "../server";

const router = express.Router();

router.get("/setTheme", validateUser, async (req, res) => {
  const { theme } = req.query as { theme: "dark" | "light" };

  try {
    const user = await prisma.user.update({
      where: {
        id: req.decoded?.userId,
      },
      data: {
        theme: theme,
      },
    });
    console.log(theme);
    res.json({
      status: "ok",
      message: "theme updated",
      user,
    });
  } catch {
    res.json({
      status: "fail",
      message: "theme updated failed",
    });
  }
});

export default router;

import express from "express";
import { uploadFileToMulter } from "../middleware/multer";
import { validateUser } from "../middleware/validateUser";
import { uploadFileToS3 } from "../utils/s3Buket";
import { prisma } from "../server";
const router = express.Router();

router.post(
  "/upload",
  validateUser,
  uploadFileToMulter.fields([{ name: "book" }, { name: "cover" }]),
  async (req, res) => {
    const { bookName, author } = req.body;

    if (!req.decoded?.userId)
      return {
        status: "fail",
        message: "user not logged in",
      };
    try {
      const book = (req.files as any).book[0];
      const cover = (req.files as any).cover[0];

      const bookKey = `uploaded-pdfs/${Date.now().toString()}-${
        book.originalname
      }`;
      const coverKey = `uploaded-images/${Date.now().toString()}-${
        cover.originalname
      }`;

      await uploadFileToS3(bookKey, book.buffer);
      await uploadFileToS3(coverKey, cover.buffer);

      const bookURL = `https://s3.tebi.io/luminex/${encodeURIComponent(
        bookKey
      )}`;
      const coverURL = `https://s3.tebi.io/luminex/${encodeURIComponent(
        coverKey
      )}`;

      await prisma.book.create({
        data: {
          author,
          name: bookName,
          bookURL,
          coverURL,

          user: {
            connect: {
              id: req.decoded.userId,
            },
          },
        },
      });

      return res.json({
        status: "ok",
        message: "uploaded successful",
      });
    } catch (e) {
      console.log(e);
      return res.json({
        status: "fail",
        message: "upload failed",
      });
    }
  }
);

router.get("/getBooksByUser", validateUser, async (req, res) => {
  const uid = req.decoded?.userId;

  try {
    const books = await prisma.book.findMany({
      where: {
        userId: uid,
      },
    });

    res.json({
      status: "ok",
      message: "books found",
      books,
    });
  } catch (e) {
    res.json({
      status: "fail",
      message: "failed to retrieve book",
    });
  }
});

router.get("/getBook", validateUser, async (req, res) => {
  const payload = req.query as { bookId: string };

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: payload.bookId,
      },
    });

    if (book) {
      return res.json({
        status: "ok",
        message: "book url retried",
        book,
      });
    } else {
      return res.json({
        status: "fail",
        message: "book not found",
      });
    }
  } catch {
    return res.json({
      status: "fail",
      message: "failed to retrieve book url",
    });
  }
});

router.post("/updateProgress", validateUser, async (req, res) => {
  const payload = req.body as {
    bookId: string;
    location: string;
    progress: number;
  };

  try {
    await prisma.book.update({
      where: {
        id: payload.bookId,
      },
      data: {
        location: payload.location,
        progress: payload.progress,
      },
    });
    res.json({
      status: "ok",
      message: "progress updated",
    });
  } catch (e) {
    res.json({
      status: "fail",
      message: "failed to update progress",
    });
  }
});

router.post("/addFavourite", validateUser, async (req, res) => {
  const payload = req.body as { bookId: string };

  const decodedToken = req.decoded;

  try {
    await prisma.book.update({
      where: {
        id: payload.bookId,
        userId: decodedToken?.userId,
      },
      data: {
        isFavourited: true,
      },
    });
    res.json({
      status: "ok",
      message: "book added to favourite",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find book",
    });
  }
});

router.post("/removeFavourite", validateUser, async (req, res) => {
  const payload = req.body as { bookId: string };

  const decodedToken = req.decoded;

  try {
    await prisma.book.update({
      where: {
        id: payload.bookId,
        userId: decodedToken?.userId,
      },
      data: {
        isFavourited: false,
      },
    });
    res.json({
      status: "ok",
      message: "book removed from favourite",
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find book",
    });
  }
});

router.get("/getFavourites", validateUser, async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        userId: req.decoded?.userId,
        isFavourited: true,
      },
    });
    res.json({
      status: "ok",
      message: "books found",
      books,
    });
  } catch {
    res.json({
      status: "fail",
      message: "failed to find favourite books",
    });
  }
});

router.get("/search", validateUser, async (req, res) => {
  const { searchTerm } = req.query as { searchTerm: string };

  try {
    const books = await prisma.book.findMany({
      where: {
        userId: req.decoded?.userId,
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    });

    res.json({
      status: "ok",
      message: "books found",
      books,
    });
  } catch (e) {
    res.json({
      status: "fail",
      message: "failed to retrieve books",
    });
  }
});

export default router;

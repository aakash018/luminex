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
    const { bookName, author, totalPages } = req.body;

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
          totalPages: parseInt(totalPages),
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

router.get("/get-1", validateUser, async (req, res) => {
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

export default router;

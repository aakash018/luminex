import express from "express";

const app = express();
const PORT = 5000;

app.get("/", (_, res) => {
  res.send("SERVER IS RUNNING");
});

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING AT", PORT);
});

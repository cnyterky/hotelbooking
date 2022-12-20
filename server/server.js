import express from "express";
import fs from "fs";
require("dotenv").config({ path: "./.env" });
const morgan = require("morgan");
var cors = require("cors");
import mongoose from "mongoose";

const app = express();
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

app.use(cors());
app.use(morgan("dev"));
// app.use(express.json);
app.use(express.json({ extended: true, limit: "1mb" }));

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));

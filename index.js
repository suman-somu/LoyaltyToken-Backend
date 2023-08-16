//entry point for the application

const express = require("express");
const _routes = require("./routes/_routes");
const connectDB = require("./config/db");
var cors = require("cors");


const PORT = 8000;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", _routes);

app.get("/", (req, res) => {
  res.send(`${req.method} Route ${req.path} not found !`);
});

app.listen(PORT, () => {
  console.log(`server run on port ${PORT} ✅`);
});

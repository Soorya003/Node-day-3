const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes  = require("./routes/index")

const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://guvi:guvi@guvi.qgrirnt.mongodb.net/")
  .then(() => {
    console.log("connected to Mongodb");
  });

  app.use("/api",routes);

  const PORT = 3000;
  app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
  });


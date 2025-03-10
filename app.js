const express = require("express");
const connectDB = require("./db/connection.js");
const router = require("./routes/APIV1Store.js");
const app = express();
const PORT = process.env.PORT;

app.use("/api/v1/store", router);

app.get("/", (req, res) => {
  res.status(200)
    .send(`<h1> Welcome to store-API, click the link below to proceed further execution </h1> 
  <a href = "/api/v1/store/items/get"> Click here </a>`);
});

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`the server listen on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

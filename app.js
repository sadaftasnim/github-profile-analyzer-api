require("dotenv").config();

require("./config/db");

const express = require("express");

const githubRoutes = require("./routes/githubRoutes");

const app = express();

app.use(express.json());

app.use("/api/github", githubRoutes);

app.listen(3000, () => {
    console.log("Server Running On Port 3000");
});
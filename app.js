require("dotenv").config();

require("./config/db");

const express = require("express");
const githubRoutes = require("./routes/githubRoutes");

const app = express();

app.use(express.json());

app.use("/api/github", githubRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});
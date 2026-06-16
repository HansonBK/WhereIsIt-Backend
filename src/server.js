require('dotenv').config();

const routes = require("./routes/auth.routes.js");
const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.use("/", routes )

app.listen(PORT, () =>{

    console.log(`Server Running on port ${PORT}`)
});
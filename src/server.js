require('dotenv').config();


const express = require("express");
const routes = require("./routes/auth.routes.js"); 

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use("/", routes);


app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
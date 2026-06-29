require('dotenv').config();


const express = require("express");
const authRoutes = require("./routes/auth.routes.js"); 
const propertiesRoutes = require("./routes/property.routes.js")

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use("/", authRoutes);
app.use("/api/properties", propertiesRoutes);


app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
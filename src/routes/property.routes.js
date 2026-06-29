const express = require("express");
const router = express.Router();
const propertyServices = require("../services/property.service.js");
const verifyToken = require("../middleware/Jwt.auth.js");

router.use(verifyToken);

router.post("/", async (req, res)=>{

    try {

        const {name} = req.body;
        if(!name){
            return res.status(400).json({ message: "Property name is required" });
        }
        const userId = req.user.id
        const newProperty = await propertyServices.createProperty(name ,userId)
        return res.status(200).json(newProperty)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


module.exports = router;
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

router.get("/", async(req,res)=>{

    try {
        const properties = await propertyServices.getAllProperties();
        return res.status(200).json(properties);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

router.get("/:id", async(req,res)=>{

    try {
        const propertyId = req.params.id;
        const propertiy = await propertyServices.getpropertyById(propertyId);
        if(!propertiy){
            return res.status(404).json({message: "Property not found! "});

        }
        return res.status(200).json(propertiy);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})



router.put("/:id", async (req,res)=>{

    try {
        const propertyId = req.params.id;
        const updateData = req.body;
        const propertiy = await propertyServices.updateProperty(propertyId, updateData);
        return res.status(200).json(propertiy);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.status(500).json({ error: error.message });
    }
} )



router.delete("/:id", async (req, res) => {
    try {
        const propertyId = req.params.id;
        
        await propertyServices.deleteProperty(propertyId);
        return res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
const express = require ("express");
const router = express.Router();
const authService = require("../services/auth.service.js");

router.get("/", (req, res)=> {

    res.json(authService.HelloMessage());
});
router.post("/api/auth/register", (req,res) =>{

    const User = req.body;
    if(Object.keys(User).length > 0){
        res.status(200).json("user Created");
    }else{
        res.status(401).json("Body is empty");
    }
})

module.exports = router;
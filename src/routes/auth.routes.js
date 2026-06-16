const express = require ("express");
const router = express.Router();
const authService = require("../services/auth.service.js");


router.get("/", (req, res)=> {

    res.json(authService.HelloMessage());
});
router.post("/api/auth/register", async (req,res) =>{

    try {

        const {email, password, name} = req.body;
        if(!email || !password || !name){
            return res.status(400).json("Please provide both email and password");
        }
        const createUser = await authService.register(email, password, name);

        res.status(200).json({message: "Sucess! User saved to PostgreSQL!",
            databaseRow: createUser
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Register failed! ", 
            error: error.message
        });
    }


})

module.exports = router;
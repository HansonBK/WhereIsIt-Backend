const express = require ("express");
const router = express.Router();
const authService = require("../services/auth.service.js");
const jwt = require("jsonwebtoken");


router.get("/", (req, res)=> {

    res.json(authService.HelloMessage());
});
router.post("/api/auth/register", async (req,res) =>{

    try {

        const {email, password, name} = req.body;
        if(!email || !password || !name){
            return res.status(400).json("All field are required! ");
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

router.post("/api/auth/login", async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json("All field are required! ");
        }
        const user = await authService.login(email,password);

        if (!user) {
            return res.status(401).json("Invalid email or password!");
        }

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET ,
            {expiresIn: "1d"}
        )

         return res.status(200).json({
            message: "Logged in successfully!",
            token : token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "login failed! ", 
            error: error.message
        });
    }
})






module.exports = router;
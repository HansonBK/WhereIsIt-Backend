const express = require("express");
const router = express.Router();
const spaceServices = require("../services/space.service.js");
const verifyToken = require("../middleware/Jwt.auth.js");
const { Prisma } = require("@prisma/client/extension");

router.use(verifyToken);


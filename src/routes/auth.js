import express from "express";
import { signup, signin, getProfil } from "../controllers/auth.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";

const router = express.Router()


router.post('/signup', signup)
router.post('/signin', signin)
router.get('/get-profil/:_id', authentication, getProfil)



export { router as authRouter }
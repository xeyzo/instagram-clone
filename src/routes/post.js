import express from "express";
import { createPost, allPost, mypost } from "../controllers/post.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/all-post',authentication, allPost);
router.get('/my-post',authentication, mypost);
router.post('/create-post',authentication, createPost);

export { router as postRouter }
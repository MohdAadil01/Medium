import { Router } from "express";
import { createBlog, updateBlog, getBlog } from "../controller/blog.controller";

const router = Router();

router.get("/:id", getBlog);

router.post("/", createBlog);

router.put("/", updateBlog);

export default router;

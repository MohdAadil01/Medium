"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../controller/blog.controller");
const router = (0, express_1.Router)();
router.get("/:id", blog_controller_1.getBlog);
router.post("/", blog_controller_1.createBlog);
router.put("/", blog_controller_1.updateBlog);
exports.default = router;

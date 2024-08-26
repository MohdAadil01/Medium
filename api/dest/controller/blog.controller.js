"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlog = exports.updateBlog = exports.createBlog = void 0;
const createBlog = (req, res) => {
    res.json({
        message: "blog",
    });
};
exports.createBlog = createBlog;
const updateBlog = (req, res) => {
    res.json({
        message: "blog put",
    });
};
exports.updateBlog = updateBlog;
const getBlog = (req, res) => {
    res.send("Hello Express: Responses!");
};
exports.getBlog = getBlog;

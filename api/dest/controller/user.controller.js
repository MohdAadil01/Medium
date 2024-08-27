"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(5).max(20),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const validation = signupSchema.safeParse({
            username,
            email,
            password,
        });
        if (!validation.success) {
            return next({
                status: 400,
                message: "Invalid Inputs",
                details: validation.error.errors,
            });
        }
        const user = yield prisma.user.findFirst({
            where: { email: email },
        });
        if (user) {
            return next({
                status: 400,
                message: "Account already exist.",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        const token = jsonwebtoken_1.default.sign({ user: newUser.username }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            message: "Signed up.",
        });
    }
    catch (error) {
        next({
            status: 500,
            message: "Error while signing up.",
            details: error.message,
        });
    }
});
exports.signup = signup;
const signInSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validation = signInSchema.safeParse({ email, password });
        if (!validation.success) {
            return next({ status: 401, message: "Invalid Inputs" });
        }
        const user = yield prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            return next({
                status: 404,
                message: "Don't have an account. Create One",
            });
        }
        const isSamePassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isSamePassword) {
            return next({
                status: 404,
                message: "Invalid creadentials.",
            });
        }
        const token = jsonwebtoken_1.default.sign({ user: user.email }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            message: "Logged In.",
        });
    }
    catch (error) {
        return next({
            status: 401,
            message: error.message,
        });
    }
});
exports.signin = signin;

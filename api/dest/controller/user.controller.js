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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        const { password: _ } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        res.status(200).json({
            user: userWithoutPassword,
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
const signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("signin");
});
exports.signin = signin;

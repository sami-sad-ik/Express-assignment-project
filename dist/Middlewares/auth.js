"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (...roles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "You are not Allowed" });
        }
        const token = authHeader?.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Forbidden access" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json({
                success: false,
                error: "Unauthorized!",
            });
        }
        next();
    };
};
exports.default = auth;

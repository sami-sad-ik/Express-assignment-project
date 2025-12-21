"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const createUser = async (req, res) => {
    try {
        const result = await auth_service_1.authService.createUserToDB(req.body);
        if (!result.rows || result.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "User not created",
            });
        }
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await auth_service_1.authService.loginUser(email, password);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.authController = {
    createUser,
    login,
};

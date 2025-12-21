"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const getUser = async (req, res) => {
    try {
        const result = await user_service_1.userService.getUserFromDB();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const loggedInUser = req.user;
    try {
        if (loggedInUser.role === "customer") {
            if (loggedInUser.id !== userId) {
                return res.status(403).json({
                    success: false,
                    message: "You can only update your own profile.",
                });
            }
            if ("role" in req.body) {
                return res.status(403).json({
                    success: false,
                    message: "You are not allowed to change your role.",
                });
            }
        }
        const result = await user_service_1.userService.updateUserInDB(userId, req.body);
        res.status(201).json({
            success: true,
            message: "User updated successfully",
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
const deleteUser = async (req, res) => {
    try {
        const result = await user_service_1.userService.deleteUserFromDB(req.params.id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
exports.userController = {
    getUser,
    updateUser,
    deleteUser,
};

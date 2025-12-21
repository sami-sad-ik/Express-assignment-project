"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../Middlewares/auth"));
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)("admin"), user_controller_1.userController.getUser);
router.put("/:id", (0, auth_1.default)("admin"), user_controller_1.userController.updateUser);
router.delete("/:id", (0, auth_1.default)("admin"), user_controller_1.userController.deleteUser);
exports.userRoute = router;

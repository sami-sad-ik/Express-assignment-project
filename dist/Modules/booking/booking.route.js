"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../Middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/", booking_controller_1.bookingController.createBooking);
router.get("/", (0, auth_1.default)("admin", "customer"), booking_controller_1.bookingController.getBooking);
router.put("/:id", (0, auth_1.default)("admin", "customer"), booking_controller_1.bookingController.updateBooking);
exports.bookingRoute = router;

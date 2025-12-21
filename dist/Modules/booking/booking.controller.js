"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = async (req, res) => {
    try {
        const result = await booking_service_1.bookingService.createBookingToDB(req.body);
        res.status(201).json({
            success: true,
            message: "Booked successfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const getBooking = async (req, res) => {
    console.log(req.user);
    try {
        const result = await booking_service_1.bookingService.getBookingFromDB(req.user);
        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
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
const updateBooking = async (req, res) => {
    try {
        const result = await booking_service_1.bookingService.updateBookingInDB(req.params.id, req.user);
        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
exports.bookingController = {
    createBooking,
    getBooking,
    updateBooking,
};

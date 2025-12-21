"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicle_service_1 = require("./vehicle.service");
const createVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.createVehicleToDB(req.body);
        if (!result.rows || result.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Vehicle not created",
            });
        }
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
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
const getVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.getVehicleFromDB();
        res.status(200).json({
            success: true,
            message: "vehicles retrieved successfully",
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
const getSingleVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.getSingleVehicleFromDB(req.params.id);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "No vehicle found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "vehicle retrieved successfully",
                data: result.rows,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const updateVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.updateVehicleInDB(req.params.id, req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle updated successfully",
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
const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.deleteVehicleFromDB(req.params.id);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "No vehicle found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "vehicle deleted successfully",
                data: result.rows,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.vehicleController = {
    createVehicle,
    getVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
};

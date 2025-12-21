"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoute = void 0;
const express_1 = require("express");
const vehicle_controller_1 = require("./vehicle.controller");
const auth_1 = __importDefault(require("../../Middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.createVehicle);
router.get("/", vehicle_controller_1.vehicleController.getVehicle);
router.get("/:id", vehicle_controller_1.vehicleController.getSingleVehicle);
router.put("/:id", (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.updateVehicle);
router.delete("/:id", (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.deleteVehicle);
exports.vehicleRoute = router;

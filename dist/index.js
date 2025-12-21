"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = require("./Database/db");
const user_route_1 = require("./Modules/user/user.route");
const auth_route_1 = require("./Modules/auth/auth.route");
const vehicle_route_1 = require("./Modules/vehicle/vehicle.route");
const booking_route_1 = require("./Modules/booking/booking.route");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use("/api/v1/auth", auth_route_1.authRoute);
app.use("/api/v1/users", user_route_1.userRoute);
app.use("/api/v1/vehicles", vehicle_route_1.vehicleRoute);
app.use("/api/v1/bookings", booking_route_1.bookingRoute);
(0, db_1.initDB)();
app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

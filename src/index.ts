import "dotenv/config";
import express, { Request, Response } from "express";
import { initDB } from "./Database/db";
import { userRoute } from "./Modules/user/user.route";
import { authRoute } from "./Modules/auth/auth.route";
import { vehicleRoute } from "./Modules/vehicle/vehicle.route";
import { bookingRoute } from "./Modules/booking/booking.route";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/vehicles", vehicleRoute);
app.use("/api/v1/bookings", bookingRoute);

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

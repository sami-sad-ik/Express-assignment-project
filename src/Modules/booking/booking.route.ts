import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../Middlewares/auth";

const router = Router();

router.post("/", bookingController.createBooking);
router.get("/", auth("admin", "customer"), bookingController.getBooking);
router.put("/:id", auth("admin", "customer"), bookingController.updateBooking);

export const bookingRoute = router;

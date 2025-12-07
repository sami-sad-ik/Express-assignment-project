import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBookingToDB(req.body);
    res.status(201).json({
      success: true,
      message: "Booked successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getBooking = async (req: Request, res: Response) => {
  console.log(req.user);
  try {
    const result = await bookingService.getBookingFromDB(req.user);
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.updateBookingInDB(
      req.params.id as string,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getBooking,
  updateBooking,
};

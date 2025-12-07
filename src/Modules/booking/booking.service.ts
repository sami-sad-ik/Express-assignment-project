import { pool } from "../../Database/db";

const createBookingToDB = async (payload: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const vehicleResult = await pool.query(
    `SELECT id, daily_rent_price, availability_status
     FROM vehicles 
     WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleResult.rowCount === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];

  const conflict = await pool.query(
    `SELECT * FROM bookings 
     WHERE vehicle_id = $1
     AND NOT (rent_end_date < $2 OR rent_start_date > $3)`,
    [vehicle_id, rent_start_date, rent_end_date]
  );

  if ((conflict.rowCount ?? 0) > 0) {
    throw new Error("Vehicle is not available for selected dates");
  }

  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);

  const utcStart = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const utcEnd = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );

  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.ceil((utcEnd - utcStart) / msPerDay);
  const total_price = days * Number(vehicle.daily_rent_price);

  const newBooking = await pool.query(
    `INSERT INTO bookings (
      customer_id, 
      vehicle_id, 
      rent_start_date, 
      rent_end_date, 
      total_price,
      status
    )
    VALUES ($1, $2, $3, $4, $5, 'active')
    RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  await pool.query(
    `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
    [vehicle_id]
  );

  return newBooking;
};

const getBookingFromDB = async (payload: any) => {
  const { id, role } = payload;

  let result;
  if (role === "admin") {
    result = await pool.query("SELECT * FROM bookings");
  } else {
    result = await pool.query("SELECT * FROM bookings WHERE customer_id = $1", [
      id,
    ]);
  }
  return result;
};

const updateBookingInDB = async (bookingId: string, payload: any) => {
  const { id: userId, role } = payload;

  const bookingResult = await pool.query(
    "SELECT * FROM bookings WHERE id = $1",
    [bookingId]
  );

  if (bookingResult.rowCount === 0) {
    throw new Error("Booking not found");
  }

  const booking = bookingResult.rows[0];

  if (role === "customer") {
    if (booking.customer_id !== userId) {
      throw new Error("You are not allowed to modify this booking");
    }

    const now = new Date();
    const startDate = new Date(booking.rent_start_date);

    if (now >= startDate) {
      throw new Error("Booking cannot be cancelled after start date");
    }

    const cancelRes = await pool.query(
      `UPDATE bookings 
       SET status = 'cancelled' 
       WHERE id = $1
       RETURNING *`,
      [bookingId]
    );

    await pool.query(
      `UPDATE vehicles
       SET availability_status = 'available'
       WHERE id = $1`,
      [booking.vehicle_id]
    );

    return cancelRes.rows[0];
  }

  if (role === "admin") {
    const updatedBooking = await pool.query(
      `UPDATE bookings 
       SET status = 'returned'
       WHERE id = $1
       RETURNING *`,
      [bookingId]
    );

    await pool.query(
      `UPDATE vehicles
       SET availability_status = 'available'
       WHERE id = $1`,
      [booking.vehicle_id]
    );

    return updatedBooking;
  }
};

export const bookingService = {
  createBookingToDB,
  getBookingFromDB,
  updateBookingInDB,
};

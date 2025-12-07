import { pool } from "../../Database/db";

const createVehicleToDB = async (payload: any) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
    INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price, availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getVehicleFromDB = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

const getSingleVehicleFromDB = async (id: any) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
  return result;
};

const updateVehicleInDB = async (id: string, payload: any) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1 , type=$2, registration_number=$3 ,daily_rent_price=$4 , availability_status=$5 WHERE id=$6`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );
  return result;
};

const deleteVehicleFromDB = async (id: string) => {
  const bookingCheck = await pool.query(
    `SELECT id 
     FROM bookings 
     WHERE vehicle_id = $1 
     AND status = 'active'`,
    [id]
  );

  if ((bookingCheck.rowCount ?? 0) > 0) {
    throw new Error(
      "Vehicle cannot be deleted because it has active bookings."
    );
  }

  // 2. Safe to delete
  const result = await pool.query(
    `DELETE FROM vehicles WHERE id=$1 RETURNING *`,
    [id]
  );

  if (result.rowCount === 0) {
    throw new Error("Vehicle not found.");
  }

  return result;
};

export const vehicleService = {
  createVehicleToDB,
  getVehicleFromDB,
  getSingleVehicleFromDB,
  updateVehicleInDB,
  deleteVehicleFromDB,
};

import { pool } from "../../Database/db";

const getUserFromDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const updateUserInDB = async (id: string, payload: any) => {
  const { name, email, phone, role } = payload;
  const result = await pool.query(
    `UPDATE users SET name=$1 , email=$2, phone=$3 ,role=$4 WHERE id=$5`,

    [name, email, phone, role, id]
  );
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const bookingCheck = await pool.query(
    `SELECT id 
     FROM bookings
     WHERE customer_id = $1
     AND status = 'active'`,
    [id]
  );

  if (bookingCheck.rows.length > 0) {
    throw new Error(
      "User cannot be deleted because they have active bookings."
    );
  }

  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("User not found.");
  }

  return result;
};

export const userService = {
  getUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};

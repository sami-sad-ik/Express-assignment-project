"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../Database/db");
const getUserFromDB = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result;
};
const updateUserInDB = async (id, payload) => {
    const { name, email, phone, role } = payload;
    const result = await db_1.pool.query(`UPDATE users SET name=$1 , email=$2, phone=$3 ,role=$4 WHERE id=$5`, [name, email, phone, role, id]);
    return result;
};
const deleteUserFromDB = async (id) => {
    const bookingCheck = await db_1.pool.query(`SELECT id 
     FROM bookings
     WHERE customer_id = $1
     AND status = 'active'`, [id]);
    if (bookingCheck.rows.length > 0) {
        throw new Error("User cannot be deleted because they have active bookings.");
    }
    const result = await db_1.pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
    if (result.rows.length === 0) {
        throw new Error("User not found.");
    }
    return result;
};
exports.userService = {
    getUserFromDB,
    updateUserInDB,
    deleteUserFromDB,
};

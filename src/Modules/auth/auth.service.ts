import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { pool } from "../../Database/db";
const createUserToDB = async (payload: any) => {
  const { name, email, password, phone, role } = payload;

  if (!email) {
    throw new Error("Email is required.");
  }
  const normalizedEmail = email.toLowerCase();

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, normalizedEmail, hashedPassword, phone, role]
  );
  return result;
};

const loginUser = async (email: string, password: string) => {
  const normalizedEmail = email.toLowerCase();

  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    normalizedEmail,
  ]);
  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return false;
  }
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.TOKEN_SECRET as string,
    { expiresIn: "7d" }
  );
  return { token, user };
};

export const authService = {
  createUserToDB,
  loginUser,
};

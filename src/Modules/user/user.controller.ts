import { Request, Response } from "express";
import { userService } from "./user.service";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserFromDB();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  const loggedInUser = req.user as any;
  try {
    if (loggedInUser.role === "customer") {
      if (loggedInUser.id !== userId) {
        return res.status(403).json({
          success: false,
          message: "You can only update your own profile.",
        });
      }

      if ("role" in req.body) {
        return res.status(403).json({
          success: false,
          message: "You are not allowed to change your role.",
        });
      }
    }
    const result = await userService.updateUserInDB(userId, req.body);
    res.status(201).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUserFromDB(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const userController = {
  getUser,
  updateUser,
  deleteUser,
};

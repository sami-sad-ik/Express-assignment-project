import { Request, response, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.createVehicleToDB(req.body);

    if (!result.rows || result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Vehicle not created",
      });
    }
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getVehicleFromDB();
    res.status(200).json({
      success: true,
      message: "vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getSingleVehicleFromDB(req.params.id);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "No vehicle found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "vehicle retrieved successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.updateVehicleInDB(
      req.params.id as string,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.deleteVehicleFromDB(
      req.params.id as string
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "No vehicle found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "vehicle deleted successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleController = {
  createVehicle,
  getVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};

import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "You are not Allowed" });
    }
    const token = authHeader?.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Forbidden access" });
    }
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as JwtPayload;
    req.user = decoded;
    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized!",
      });
    }
    next();
  };
};

export default auth;

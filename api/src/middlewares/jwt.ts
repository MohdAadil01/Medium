import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: jwt.JwtPayload | string;
}

const verify = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return next({
      status: 401,
      message: "Authorization header is missing",
    });
  }
  const token = header?.split(" ")[1];
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decodedData;
    next();
  } catch (error: any) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

export default verify;

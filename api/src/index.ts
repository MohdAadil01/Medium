import express from "express";
import UserRoutes from "./routes/user.route";
import cors from "cors";
import BlogRoutes from "./routes/blog.route";
import { Request, Response, NextFunction } from "express";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", UserRoutes);
app.use("/api/v1/blog", BlogRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import { PrismaClient } from "@prisma/client";
import UserRoutes from "./routes/user.route";
import BlogRoutes from "./routes/blog.route";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.use("/api/v1", UserRoutes);
app.use("/api/v1/blog", BlogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

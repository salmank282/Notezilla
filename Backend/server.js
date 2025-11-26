/**
 * @dependencies
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

/**
 * Additional libraries
 */
import connectDB from "./src/config/db.js";
import noteRoutes from "./src/routes/notesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

//Register Routes
app.use("/api/notezilla", noteRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running at port http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error(`Failed to Start the server ${err.message}`);
  process.exit(1);
});

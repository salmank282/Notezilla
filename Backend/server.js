import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Notezilla");
});

app.listen(port,()=>{
    console.log(`Server is running at port http://localhost:${port}`)
})
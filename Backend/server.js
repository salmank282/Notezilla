import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import Note from "./src/models/noteModel.js";

dotenv.config();

const app = express();
const PORT  = process.env.PORT;

app.use(cors());
app.use(express.json());

const startServer=async() => {
  await connectDB();

  app.post("/",async (req,res)=>{
      try{
         const note = await Note.create(req.body)
          res.status(201).send({success:true,result:note})
      }catch(err){
        res.status(500).json({error:"Error saving data"})
      }
  })

  app.listen(PORT , () => {
    console.log(`🚀 Server is running at port http://localhost:${PORT}`);
  });
}

startServer().catch(err =>{
    console.error(`Failed to Start the server ${err.message}`)
    process.exit(1);
})
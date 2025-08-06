import express , { Request , Response } from  "express";
import cors from "cors" ;
import "dotenv/config" ;
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute"
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("✅ Connected to database!"))
  .catch((err) => console.error("❌ Failed to connect to DB:", err));

   cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEYS,
    api_secret: process.env.CLOUDINARY_API_SECRET,
   });

const app = express();
app.use(express.json());
app.use(cors()); 
        
app.get("/health" , async (req: Request , res: Response) => {
   res.send({ message : "health OK!"})
})


// ✅ Mount all routes under /api/my/user
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);

app.use((req, res, next) => {
  console.log("➡️ Incoming Request:", req.method, req.url);
  next();
});
 app.get("/debug", (req, res) => {
  res.send("Debug route works!");
});
app.get("/test-backend", (req, res) => {
  console.log("✅ /test-backend hit"); 
  res.send("Backend working");
});



app.listen(7000, () => {
  console.log("server started on http://localhost:7000");
});

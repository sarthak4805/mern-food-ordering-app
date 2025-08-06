import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
//import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { jwtCheck, jwtParse } from "../middleware/auth";


const router = express.Router();

// Multer memory storage config
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});         

 // router.get("/",jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant)
  
// Route: POST /api/my/restaurant  

router.get("/", jwtCheck ,  MyRestaurantController.getMyRestaurant);

router.post(
  "/",
   upload.single("imageFile"),
  validateMyRestaurantRequest,

  jwtCheck,
  jwtParse,
  
  MyRestaurantController.createMyRestaurant
);

router.put(
  "/",
   upload.single("imageFile"),
  validateMyRestaurantRequest,

  jwtCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurant
)

export default router;  

   
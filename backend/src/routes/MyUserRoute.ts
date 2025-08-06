import express from "express";
import { createCurrentUser, getCurrentUser, updateCurrentUser } from "../controllers/MyUserController"; // ✅ named import
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.get("/", jwtCheck , jwtParse , getCurrentUser)
router.post("/", jwtCheck, createCurrentUser); // ✅ use function directly
router.put("/", jwtParse, ...validateMyUserRequest, updateCurrentUser);
// ✅ Now each function inside the array is treated as its own middleware


export default router; 
  
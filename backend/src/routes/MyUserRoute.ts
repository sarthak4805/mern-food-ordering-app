import express from "express";
import { createCurrentUser } from "../controllers/MyUserController"; // ✅ named import
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

router.post("/", jwtCheck, createCurrentUser); // ✅ use function directly

export default router;

import express from "express";
import { accessToData, getMovies, regenerateToken, register } from "../Controller/userController.js";
import { registerChecks } from "../Middleware/authChecks.js";


const router = express.Router();

router.post('/register', registerChecks, register);
router.post('/regenerate-token', regenerateToken);
router.post('/access-data', accessToData);
router.post('/get-movies', getMovies);

export default router;
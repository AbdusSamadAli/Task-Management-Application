import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET TASKS */
router.get("/", protect, getTasks);

/* CREATE TASK */
router.post("/", protect, createTask);

/* UPDATE TASK */
router.put("/:id", protect, updateTask);

export default router;
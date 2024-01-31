import {Router} from "express";
import {TaskController} from "./task.controller.js";
import {TaskService} from "./task.service.js";

const router = Router()

const taskService = new TaskService()
const taskController = new TaskController(taskService)

router.post("/", taskController.insert);
router.put("/:id", taskController.updateById);
router.delete("/:id", taskController.delete);
router.get("/:id", taskController.getById);
router.get("/", taskController.getAll);


export default {router}

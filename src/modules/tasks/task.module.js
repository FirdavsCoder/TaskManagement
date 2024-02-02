import {Router} from "express";
import {TaskController} from "./task.controller.js";
import {TaskService} from "./task.service.js";
import {checkUser} from "../../middleware/middleware.js";

const router = Router()

const taskService = new TaskService()
const taskController = new TaskController(taskService)

router.post("/", checkUser, taskController.insert);
router.put("/:id", checkUser, taskController.updateById);
router.delete("/:id", checkUser, taskController.delete);
router.get("/:id", checkUser, taskController.getById);
router.get("/", checkUser, taskController.getAll);
router.get("/company/:id", taskController.getByCompanyId);



export default {router}
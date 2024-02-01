import {Router} from "express";
import {UserTaskService} from "./user-task.service.js";
import {UserTaskController} from "./user-task.controller.js";

const router = Router()

const userTaskService = new UserTaskService()
const userTaskController = new UserTaskController(userTaskService)

router.post("/", userTaskController.insert);
router.put("/:id", userTaskController.updateById);
router.delete("/:id", userTaskController.delete);
router.get("/:id", userTaskController.getById);
router.get("/", userTaskController.getAll);


export default {router}
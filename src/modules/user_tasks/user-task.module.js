import {Router} from "express";
import {UserTaskService} from "./user-task.service.js";
import {UserTaskController} from "./user-task.controller.js";
import {checkUser} from "../../middleware/middleware.js";

const router = Router()

const userTaskService = new UserTaskService()
const userTaskController = new UserTaskController(userTaskService)

router.post("/", checkUser,  userTaskController.insert);
router.put("/:id", checkUser,  userTaskController.updateById);
router.delete("/:id", checkUser,  userTaskController.delete);
router.get("/task/:id", userTaskController.getByTaskId);
router.get("/user/:id", userTaskController.getByUserId);
router.get("/", userTaskController.getAll);
router.get("/:id", userTaskController.getById);



export default {router}
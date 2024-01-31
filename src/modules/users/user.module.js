import {Router} from "express";
import {UserController} from "./user.controller.js";
import {UserService} from "./user.service.js";

const router = Router()

const userService = new UserService()
const userController = new UserController(userService)

router.post("/register", userController.insert);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getById);
router.put("/:id", userController.updateById);
router.delete("/:id", userController.delete);
router.get("/", userController.getAll);


export default {router}
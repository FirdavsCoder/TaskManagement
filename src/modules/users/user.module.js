import {Router} from "express";
import {UserController} from "./user.controller.js";
import {UserService} from "./user.service.js";
import {checkUser} from "../../middleware/middleware.js";

const router = Router()

const userService = new UserService()
const userController = new UserController(userService)

router.post("/register", userController.insert);
router.post("/login", userController.loginUser);
router.get("/:id", checkUser, userController.getById);
router.put("/:id", checkUser, userController.updateById);
router.delete("/:id", checkUser, userController.delete);
router.get("/", checkUser, userController.getAll);


export default {router}
import {Router} from "express";
import companyModule from "./companies/company.module.js";
import taskModule from "./tasks/task.module.js";
import userModule from "./users/user.module.js";


const router = Router()

router.use("/company", companyModule.router);
router.use("/task", taskModule.router);
router.use("/user", userModule.router);

export default {router}
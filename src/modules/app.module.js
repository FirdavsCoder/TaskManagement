import {Router} from "express";
import companyModule from "./companies/company.module.js";
import taskModule from "./tasks/task.module.js";


const router = Router()

router.use("/company", companyModule.router);
router.use("/task", taskModule.router);

export default {router}
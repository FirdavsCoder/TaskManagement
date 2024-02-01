import {Router} from "express";
import {CompanyController} from "./company.controller.js";
import {CompanyService} from "./company.service.js";
import {checkRole, checkUser} from "../../middleware/middleware.js";

const router = Router()

const companyService = new CompanyService()
const companyController = new CompanyController(companyService)

router.post("/", companyController.insert);
router.get("/:id", companyController.getById);
router.put("/:id", companyController.updateById);
router.delete("/:id", companyController.delete);
router.get("/", checkUser, companyController.getAll);


export default {router}


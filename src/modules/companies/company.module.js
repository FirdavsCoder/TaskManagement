import {Router} from "express";
import {CompanyController} from "./company.controller.js";
import {CompanyService} from "./company.service.js";
import {checkRole, checkUser} from "../../middleware/middleware.js";

const router = Router()

const companyService = new CompanyService()
const companyController = new CompanyController(companyService)

router.post("/", checkUser, companyController.insert);
router.put("/:id", checkUser, companyController.updateById);
router.delete("/:id",checkUser, companyController.delete);
router.get("/my", checkUser, companyController.getMyCompany);
router.get("/:id", checkUser, companyController.getById);
router.get("/", checkUser, companyController.getAll);


export default {router}


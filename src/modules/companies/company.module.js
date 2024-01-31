import {Router} from "express";
import {CompanyController} from "./company.controller.js";
import {CompanyService} from "./company.service.js";

const router = Router()

const companyService = new CompanyService()
const companyController = new CompanyController(companyService)

router.post("/", companyController.insert);
router.get("/:id", companyController.getById);
router.put("/:id", companyController.updateById);
router.delete("/:id", companyController.delete);
router.get("/", companyController.getAll);


export default {router}


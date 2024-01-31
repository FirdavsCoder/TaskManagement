import {ResData} from "../../common/resData.js";
import {CompanyGetByIdSchema, CompanySchema} from "./validation/company.schema.js";
import {CompanyException} from "./exception/company.exception.js";
import {asyncHandler} from "../../middleware/async.js";


export class CompanyController {
	#companyService
	constructor(service) {
		this.#companyService = service
	}

	insert = asyncHandler( async (req, res, next) => {
		const dto = req.body
		const validatedData = CompanySchema.validate(dto)
		if(validatedData.error) {
			return next(new CompanyException(validatedData.error.message))
		}
		const resData = await this.#companyService.insert(dto)
		return res.status(resData.statusCode).json(resData)
	});

	getAll = asyncHandler(async (req, res, next) => {
		const resData = await this.#companyService.getAll()
		return res.status(resData.statusCode).json(resData)
	})

	getById = asyncHandler(async (req, res, next) => {
		const validatedData = CompanyGetByIdSchema.validate(req.params)
		if (validatedData.error) {
			return next(new ResData(validatedData.error.message, 400))
		}
		const resData = await this.#companyService.getById(req.params.id)
		return res.status(resData.statusCode).json(resData)
	})

	updateById = asyncHandler(async (req, res, next) => {
		const validatedDtoId = CompanyGetByIdSchema.validate(req.params)
		if (validatedDtoId.error) {
			throw new CompanyException(validatedDtoId.error.message)
		}
		const validatedDto = CompanySchema.validate(req.body)
		if (validatedDto.error) {
			throw new CompanyException(validatedDto.error.message)
		}

		const resData = await this.#companyService.update(req.params.id, req.body)
		return res.status(resData.statusCode).json(resData)
	})

	delete = asyncHandler( async (req, res, next) => {
		const validatedDto = CompanyGetByIdSchema.validate(req.params)
		if(validatedDto.error) {
			throw new CompanyException(validatedDto.error.message)
		}
		const resData = await this.#companyService.delete(req.params.id)
		return res.status(resData.statusCode).json(resData)
	})
}




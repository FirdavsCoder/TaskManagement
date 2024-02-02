import {ResData} from "../../common/resData.js";
import {UserGetByIdSchema, UserLoginSchema, UserSchema, UserUpdateSchema} from "./validation/user.schema.js";
import {UserException} from "./exception/user.exception.js";
import {asyncHandler} from "../../middleware/async.js";
import {CompanyException} from "../companies/exception/company.exception.js";
import {CompanyGetByIdSchema, CompanySchema} from "../companies/validation/company.schema.js";


export class UserController {
	#service
	constructor(service) {
		this.#service = service
	}

	insert = asyncHandler( async (req, res, next) => {
		const dto = req.body
		const validatedData = UserSchema.validate(dto)
		if (validatedData.error) {
			throw new UserException(validatedData.error.message, 400)
		}
		const resData = await this.#service.insert(dto)
		return res.status(resData.statusCode || 400).json(resData)
	})

	getAll = asyncHandler( async (req, res, next) => {
		if (req.role === "superAdmin") {
			const resData = await this.#service.getAll()
			return res.status(resData.statusCode).json(resData)
		}
		else if (req.role === "admin" || req.role === "manager") {
			const resData = await this.#service.getAllUsersByCompanyId(req.user.data.company_id)
			return res.status(resData.statusCode).json(resData)
		}
		else {
			throw new Error("Not Authenticated")
		}
	})


	getById = asyncHandler( async (req, res, next) => {
		const validatedData = UserGetByIdSchema.validate(req.params)
		if (validatedData.error) {
			throw new UserException(validatedData.error.message, 400)
		}


		if (req.role === "superAdmin") {
			const resData = await this.#service.getById(req.params.id)
			return res.status(resData.statusCode).json(resData)
		}
		else if (req.role === "admin" || req.role === "manager") {
			const resData = await this.#service.getUSerByCompanyUserId(req.user.data.company_id, req.params.id)
			return res.status(resData.statusCode).json(resData)
		}
		else if (req.role === "worker") {
			const resData = await this.#service.getUSerByCompanyUserId(req.user.data.company_id, req.user.data.id)
			return res.status(resData.statusCode).json(resData)
		}
		else {
			throw new Error("Not Authenticated")
		}

	})




	updateById = asyncHandler( async (req, res, next) => {
		const validatedDtoId = UserGetByIdSchema.validate(req.params)
		if (validatedDtoId.error) {
			throw new CompanyException(validatedDtoId.error.message)
		}

		const validatedDto = UserUpdateSchema.validate(req.body)
		if (validatedDto.error) {
			throw new UserException(validatedDto.error.message)
		}

		const resData = await this.#service.update(req.params.id, req.body)
		return res.status(resData.statusCode).json(resData)
	})

	delete = asyncHandler( async (req, res, next) => {
		const validatedDto = UserGetByIdSchema.validate(req.params)
		if(validatedDto.error) {
			throw new UserException(validatedDto.error.message)
		}
		const resData = await this.#service.delete(req.params.id)
		return res.status(resData.statusCode || 400).json(resData)
	})





	loginUser = asyncHandler( async (req, res, next) => {
		const dto = req.body
		const validated = UserLoginSchema.validate(dto)
		if(validated.error) {
			throw new UserException(validated.error.message)
		}
		const resData = await this.#service.loginUser(dto);
		res.header("token", resData.data.token)
		return res.status(resData.statusCode || 400).json(resData)
	})
}
import {getUserTaskByIdSchema, UpdateUserTaskSchema, UserTaskSchema} from "./validation/user-task.schema.js";
import {UserTaskException} from "./exception/user-task.exception.js";
import {asyncHandler} from "../../middleware/async.js";
import {TaskGetByIdSchema, TaskSchema} from "../tasks/validation/task.schema.js";
import {TaskException} from "../tasks/exception/task.exception.js";


export class UserTaskController {
	#service;
	constructor(service) {
		this.#service = service
	}

	insert = asyncHandler(async (req, res, next) => {
		const dto = req.body
		const validatedData = UserTaskSchema.validate(dto)
		if (validatedData.error) {
			throw new UserTaskException(validatedData.error.message)
		}
		if (req.role === "superAdmin" || req.role === "admin" || req.role === "manager") {
			const resData = await this.#service.insert(dto)
			return res.status(resData.statusCode || 400).json(resData)
		}
		const resData = await this.#service.insert(dto)
		return res.status(resData.statusCode || 400).json(resData)
	});


	getAll = asyncHandler(async (req, res, next) => {
		const resData = await this.#service.getAll()
		return res.status(resData.statusCode || 400).json(resData)
	});


	getById = asyncHandler(async (req, res, next) => {
		const validatedData = getUserTaskByIdSchema.validate(req.params)
		if (validatedData.error) {
			throw new UserTaskException(validatedData.error.message)
		}

		const resData = await this.#service.getById(req.params.id)
		return res.status(resData.statusCode || 400).json(resData)
	});


	updateById = asyncHandler(async (req, res, next) => {
		const validatedDtoId = getUserTaskByIdSchema.validate(req.params);
		if (validatedDtoId.error) {
			throw new UserTaskException(validatedDtoId.error.message)
		}

		const validatedDto = UpdateUserTaskSchema.validate(req.body)
		if (validatedDto.error) {
			throw new UserTaskException(validatedDto.error.message)
		}
		if (req.role === "superAdmin" || req.role === "admin" || req.role === "manager") {
			const resData = await this.#service.update(req.params.id, req.body)
			return res.status(resData.statusCode || 400).json(resData)
		} else {
			throw new Error("Not Access")
		}
	})

	delete = asyncHandler(async (req, res, next) => {
		const validatedDtoId = getUserTaskByIdSchema.validate(req.params)
		if(validatedDtoId.error) {
			throw new UserTaskException(validatedDtoId.error.message)
		}
		if (req.role === "superAdmin" || req.role === "admin") {
			const resData = await this.#service.delete(req.params.id)
			return res.status(resData.statusCode || 400).json(resData);
		} else {
			throw new Error("Not Access")
		}
	});

	getByTaskId = asyncHandler( async (req, res, next) => {
		const validatedData = getUserTaskByIdSchema.validate(req.params)
		if (validatedData.error) {
			throw new UserTaskException(validatedData.error.message)
		}

		const resData = await this.#service.getByTaskId(req.params.id)
		return res.status(resData.statusCode || 400).json(resData)
	})

	getByUserId = asyncHandler( async (req, res, next) => {
		const validatedData = getUserTaskByIdSchema.validate(req.params)
		if (validatedData.error) {
			throw new UserTaskException(validatedData.error.message)
		}

		const resData = await this.#service.getByUserId(req.params.id)
		return res.status(resData.statusCode || 400).json(resData)
	})

}

import {ResData} from "../../common/resData.js";
import {TaskGetByIdSchema, TaskSchema} from "./validation/task.schema.js";
import {TaskException} from "./exception/task.exception.js";
import {asyncHandler} from "../../middleware/async.js";

export class TaskController {
	#service;
	constructor(service) {
		this.#service = service
	}

	insert = asyncHandler(async (req, res, next) => {
		const dto = req.body
		const validatedData = TaskSchema.validate(dto)
		if (validatedData.error) {
			throw new TaskException(validatedData.error.message)
		}

		const resData = await this.#service.insert(dto)
		return res.status(resData.statusCode || 400).json(resData)
	});


	getAll = asyncHandler(async (req, res, next) => {
		const resData = await this.#service.getAll()
		return res.status(resData.statusCode || 400).json(resData)
	});


	getById = asyncHandler(async (req, res, next) => {
		const validatedData = TaskGetByIdSchema.validate(req.params)
		if (validatedData.error) {
			throw new TaskException(validatedData.error.message)
		}

		const resData = await this.#service.getById(req.params.id)
		return res.status(resData.statusCode || 400).json(resData)
	});


	updateById = asyncHandler(async (req, res, next) => {
		const validatedDtoId = TaskGetByIdSchema.validate(req.params);
		if (validatedDtoId.error) {
			throw new TaskException(validatedDtoId.error.message)
		}

		const validatedDto = TaskSchema.validate(req.body)
		if (validatedDto.error) {
			throw new TaskException(validatedDto.error.message)
		}

		const resData = await this.#service.update(req.params.id, req.body)
		return res.status(resData.statusCode || 400).json(resData)
	})

	delete = asyncHandler(async (req, res, next) => {
		const validatedDtoId = TaskGetByIdSchema.validate(req.params)
		if(validatedDtoId.error) {
			throw new TaskException(validatedDtoId.error.message)
		}
		const resData = await this.#service.delete(req.params.id)
		return res.status(resData.statusCode || 400).json(resData);
	});
}
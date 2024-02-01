import Joi from "joi";

export const UserTaskSchema = Joi.object({
	user_id: Joi.number().required(),
	task_id: Joi.number().required(),
	start_date: Joi.date().required(),
	end_date: Joi.date().required()
})

export const getUserTaskByIdSchema = Joi.object({
	id: Joi.number().required()
})

export const UpdateUserTaskSchema = Joi.object({
	started_date: Joi.date().required(),
	ended_date: Joi.date().required()
})
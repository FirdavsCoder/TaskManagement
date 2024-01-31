import Joi from "joi";

export const TaskSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	company_id: Joi.number().required(),
	parent_id: Joi.number(),
	day: Joi.number().required()
})

export const TaskGetByIdSchema = Joi.object({
	id: Joi.number().required()
})


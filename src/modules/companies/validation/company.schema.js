import Joi from "joi";

export const CompanySchema = Joi.object({
	name: Joi.string().required().min(5).max(64)
})

export const CompanyGetByIdSchema = Joi.object({
	id: Joi.number().required()
})


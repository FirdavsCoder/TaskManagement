import Joi from "joi";

export const UserSchema = Joi.object({
	login: Joi.string().required().max(60).min(5),
	password: Joi.string().required().max(64),
	full_name: Joi.string().required().max(80).min(5),
	company_id: Joi.number().required(),
	role: Joi.string().required().max(30).min(4)
})


export const UserGetByIdSchema = Joi.object({
	id: Joi.number().required()
})


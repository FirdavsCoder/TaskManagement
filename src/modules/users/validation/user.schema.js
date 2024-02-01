import Joi from "joi";
import {roles} from "../../../lib/roles.js";


const userRoles = Object.values(roles)
export const UserSchema = Joi.object({
	login: Joi.string().required().max(60).min(5),
	password: Joi.string().required().max(64),
	full_name: Joi.string().required().max(80).min(5),
	company_id: Joi.number().required(),
	role: Joi.string().valid(...userRoles).required().max(30).min(4)
});


export const UserLoginSchema = Joi.object({
	login: Joi.string().required(),
	password: Joi.string().required()
})

export const UserUpdateSchema = Joi.object({
	full_name: Joi.string().required().min(5).max(50),
	role: Joi.string().required().min(4).max(20)
})

export const UserGetByIdSchema = Joi.object({
	id: Joi.number().required()
})


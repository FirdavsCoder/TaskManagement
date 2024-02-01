import Joi from "joi";
import {status} from "../../../lib/roles.js";

export const UserTaskSchema = Joi.object({
	user_id: Joi.number().required(),
	task_id: Joi.number().required(),
	start_date: Joi.date().required(),
	end_date: Joi.date().required()
})

export const getUserTaskByIdSchema = Joi.object({
	id: Joi.number().required()
})


const statusEnum = Object.values(status);

export const UpdateUserTaskSchema = Joi.object({
	started_date: Joi.date().required(),
	ended_date: Joi.date().required(),
	status: Joi.string().valid(...statusEnum).required(),
})
import {ResData} from "../../common/resData.js";
import {TaskRepository} from "./task.repository.js";
import {TaskEntity} from "./entity/task.entity.js";
import {TaskException} from "./exception/task.exception.js";

export class TaskService {
	#repository;
	constructor() {
		this.#repository = new TaskRepository()
	}

	async insert(dto) {
		const newTask = new TaskEntity(dto)
		const newAddedTask = await this.#repository.insert(newTask);
		console.log(newAddedTask);
		return new ResData(
			"Successfully added",
			201,
			newAddedTask
		)
	};

	async getAll() {
		const allTasks = await this.#repository.getAll()
		return new ResData(
			"All Tasks",
			200,
			allTasks
		)
	}

	async getById(id) {
		const foundTask = await this.#repository.getById(id);
		if (!foundTask) {
			throw new TaskException("Task Not Found", 404)
		}

		return new ResData(
			"Successfully found",
			200,
			foundTask
		)
	};


	async update(id, dto) {
		await this.getById(id);

		const updateTask = new TaskEntity(dto)
		updateTask.id = id
		const updatedTask = await this.#repository.update(updateTask)
		return new ResData(
			"Successfully updated",
			200,
			updatedTask
		)
	};


	async delete(id) {
		await this.getById(id);
		const deletedTask = await this.#repository.delete(id)
		return new ResData(
			"Successfully deleted",
			200,
			deletedTask
		)
	};
}
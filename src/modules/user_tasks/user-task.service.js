import {ResData} from "../../common/resData.js";
import {UserTaskRepository} from "./user-task.repository.js";
import {UserTaskEntity} from "./entity/user-task.entity.js";
import {UserTaskException} from "./exception/user-task.exception.js";


export class UserTaskService {
	#repository;

	constructor() {
		this.#repository = new UserTaskRepository()
	};

	async insert(dto) {
		const newUserTask = new UserTaskEntity(dto)
		console.log(newUserTask)
		const addedUserTask = await this.#repository.insert(newUserTask)
		console.log(addedUserTask)
		return new ResData(
			"Successfully added",
			201,
			addedUserTask
		)
	};

	async getAll() {
		const allUserTasks = await this.#repository.getAll()
		return new ResData(
			"All Tasks",
			200,
			allUserTasks
		)
	};

	async getById(id) {
		const foundUserTask  = await this.#repository.getById(id);
		if (!foundUserTask) {
			throw new UserTaskException("User Task Not Found", 404)
		}
		return new ResData(
			"Successfully found",
			200,
			foundUserTask
		)
	};

	async update(id, dto) {
		await this.getById(id);
		dto.id = id
		const updatedUserTask = await this.#repository.update(dto)
		return new ResData(
			"Successfully updated",
			200,
			updatedUserTask
		)
	};


	async delete(id) {
		await this.getById(id);
		const deletedUserTask = await this.#repository.delete(id)
		return new ResData(
			"Successfully deleted",
			200,
			deletedUserTask
		)
	};

}

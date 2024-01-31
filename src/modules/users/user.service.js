import {ResData} from "../../common/resData.js";
import {UserRepository} from "./user.repository.js";
import {UserEntity, UserUpdateEntity} from "./entity/user.entity.js";
import {UserException} from "./exception/user.exception.js";


export class UserService {
	#repository;
	constructor() {
		this.#repository = new UserRepository()
	}

	async insert(dto) {
		const newUser = new UserEntity(dto)
		const newAddedUser = await this.#repository.insert(newUser)
		console.log(newAddedUser)
		return new ResData(
			"Successfully added",
			201,
			newAddedUser
		)
	};

	async getAll() {
		const allUsers = await this.#repository.getAll()
		return new ResData(
			"All Users",
			200,
			allUsers
		)
	};

	async getById(id) {
		const foundUser = await this.#repository.getById(id)
		if (!foundUser) {
			throw new UserException("User Not Found", 404)
		}

		return new ResData(
			"Successfully found",
			200,
			foundUser
		)
	};

	async update(id, dto) {
		await this.getById(id)

		const updateUser = new UserUpdateEntity(dto)
		updateUser.id = id
		const updatedUser = await this.#repository.update(updateUser)
		return new ResData(
			"Successfully updated",
			200,
			updatedUser
		)
	};

	async delete(id) {
		await this.getById(id);
		const deletedUser = await this.#repository.delete(id)
		return new ResData(
			"Successfully deleted",
			200,
			deletedUser
		)
	};
}
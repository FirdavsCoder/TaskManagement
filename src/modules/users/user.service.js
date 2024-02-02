import {ResData} from "../../common/resData.js";
import {UserRepository} from "./user.repository.js";
import {UserEntity, UserUpdateEntity} from "./entity/user.entity.js";
import {UserException} from "./exception/user.exception.js";
import {hashPassword, compare} from "../../lib/bcrypt.js";
import {generateToken} from "../../lib/jwt.js";



export class UserService {
	#repository;
	constructor() {
		this.#repository = new UserRepository()
	}

	async insert(dto) {
		const foundUserByLogin = await this.#repository.findOneByLogin(dto.login);
		if (foundUserByLogin) {
			throw new UserException("Login is already exist");
		}
		const hashedPassword = await hashPassword(dto.password)
		const userObject = Object.assign(dto, {password: hashedPassword})
		const newUser = new UserEntity(userObject)
		const newAddedUser = await this.#repository.insert(newUser)
		console.log(newAddedUser)
		const newToken = generateToken(newAddedUser)
		return new ResData(
			"Successfully added",
			201,
			{user: newAddedUser, access_token: newToken}
		)
	};

	async getAllUsersByCompanyId(id) {
		const allUsers = await this.#repository.getAllUsersByCompanyId(id)
		return new ResData(
			"All Users",
			200,
			allUsers
		)
	};

	async loginUser(dto) {
		const foundUserByLogin = await this.getUserByLogin(dto.login);
		if (!foundUserByLogin.data) {
			throw new UserException("User Not Found", 404);
		}
		const isValidPassword = await compare(
			dto.password,
			foundUserByLogin.data.password
		);
		if (!isValidPassword) {
			throw new UserException("Login or Password is wrong!");
		}

		return new ResData("Successfully Logged In", 200, {
			access_token: generateToken(foundUserByLogin.data),
			user: foundUserByLogin.data,
		});
	}



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

	async getUSerByCompanyUserId(company_id, user_id) {
		const foundUser = await this.#repository.getUSerByCompanyUserId(company_id, user_id)
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

	async getUserByLogin(login) {
		const foundUser = await this.#repository.findOneByLogin(login)
		let resData;
		if (foundUser) {
			resData = new ResData("Found User By Login", 200, foundUser);
		} else {
			resData = new ResData("Not Found", 404, null);
		}
		return resData;
	}
}
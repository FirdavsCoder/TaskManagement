import {Postgres} from "../../lib/pg.js";

export class UserRepository extends Postgres {
	async insert(dto) {
		return await this.fetch(
			"INSERT INTO users(login, password, full_name, company_id, role) VALUES($1, $2, $3, $4, $5) RETURNING *",
			dto.login, dto.password, dto.full_name, dto.company_id, dto.role
		)
	};

	async getAll() {
		return await this.fetchAll("SELECT * FROM users")
	}

	async getAllUsersByCompanyId(id) {
		return await this.fetchAll("SELECT * FROM users WHERE company_id =$1", id)
	}

	async getUserByCompanyAndUserId(company_id, user_id) {
		return await this.fetch("SELECT * FROM users WHERE id = $2 AND company_id = $1", company_id, user_id)
	}

	async getById(id) {
		return await this.fetch("SELECT * FROM users WHERE id = $1", id)
	};

	async findOneByLogin(login) {
		return await this.fetch("select * from users where login = $1", login);
	}

	async update(dto) {
		return await this.fetch("UPDATE users SET full_name = $2, role=$3 WHERE id = $1 RETURNING * ",
			dto.id, dto.full_name, dto.role)
	};

	async delete(id) {
		return await this.fetch("DELETE FROM users WHERE id = $1 RETURNING *", id)
	};
}
import {Postgres} from "../../lib/pg.js";

export class UserRepository extends Postgres {
	async insert(dto) {
		return await this.fetch(
			"INSERT INTO users(login, password, full_name, company_id, role) VALUES($1, $2, $3, $4, $5) RETURNING *",
			dto.login, dto.password, dto.full_name, dto.company_id, dto.role
		)
	};

	async getAll() {
		return await this.fetch("SELECT * FROM users")
	}

	async getById(id) {
		return await this.fetch("SELECT * FROM users WHERE id = $1", id)
	};

	async update(dto) {
		return await this.fetch("UPDATE users SET full_name = $2, role=$3 WHERE id = $1",
			dto.id, dto.full_name, dto.role)
	};

	async delete(id) {
		return await this.fetch("DELETE FROM users WHERE id = $1", id)
	};
}
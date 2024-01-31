import {Postgres} from "../../lib/pg.js";

export class CompanyRepository extends Postgres {
	async insert(dto) {
		return this.fetch(
			"INSERT INTO companies(name) VALUES ($1) RETURNING * ",
			dto.name
		)
	};

	async getAll() {
		return await this.fetchAll(
			"SELECT * FROM companies"
		)
	};

	async getById(id) {
		return await this.fetch(
			"SELECT * FROM companies WHERE id = $1",
			id
		)
	};

	async update(dto) {
		return await this.fetch(
			"UPDATE companies SET name = $2 WHERE id = $1 RETURNING * ",
			dto.id, dto.name
		)
	};

	async delete(id) {
		return await this.fetch(
			"DELETE FROM companies WHERE id = $1 RETURNING *",
			id
		)
	};
}
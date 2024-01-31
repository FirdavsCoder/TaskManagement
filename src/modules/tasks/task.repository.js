import {Postgres} from "../../lib/pg.js";

export class TaskRepository extends Postgres {
	async insert(dto) {
		return await this.fetch(
			"INSERT INTO tasks(title, description, company_id, parent_id, day) VALUES($1, $2, $3, $4, $5) RETURNING * ",
			dto.title, dto.description, dto.company_id, dto.parent_id, dto.day
		)
	};

	async getAll() {
		return await this.fetchAll("SELECT * FROM tasks")
	};

	async getById(id) {
		return await this.fetch("SELECT * FROM tasks WHERE id = $1", id)
	};

	async update(dto) {
		return await this.fetch(
			"UPDATE tasks SET title=$2, description=$3, company_id=$4, parent_id=$5, day=$6 WHERE id=$1 RETURNING *",
			dto.id, dto.title, dto.description, dto.company_id, dto.parent_id, dto.day
		)
	};

	async delete(id) {
		return await this.fetch("DELETE FROM tasks WHERE id=$1 RETURNING *", id)
	};
}
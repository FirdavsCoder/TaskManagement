import {Postgres} from "../../lib/pg.js";

export class UserTaskRepository extends Postgres {
	async insert(dto) {
		return await this.fetch(
			"INSERT INTO user_tasks(user_id, task_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *",
			dto.user_id, dto.task_id, dto.start_date, dto.end_date
		)
	};

	async getAll() {
		return await this.fetchAll("SELECT * FROM user_tasks")
	}

	async getById(id) {
		return await this.fetch("SELECT * FROM user_tasks WHERE id=$1", id)
	}

	async update(dto) {
		return await this.fetch(
			"UPDATE user_tasks SET started_date=$2, ended_date=$3 WHERE id = $1 RETURNING *",
			dto.id, dto.started_date, dto.ended_date
		)
	}

	async delete(id) {
		return await this.fetch("DELETE FROM user_tasks WHERE id=$1 RETURNING *", id)
	}
}
export class UserTaskEntity {
	constructor(dto) {
		this.user_id = dto.user_id
		this.task_id = dto.task_id
		this.start_date = dto.start_date
		this.end_date = dto.end_date
	}
}
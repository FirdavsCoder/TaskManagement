export class TaskEntity {
	constructor(dto) {
		this.title = dto.title
		this.description = dto.description
		this.company_id = dto.company_id
		this.parent_id = dto.parent_id
		this.day = dto.day
	}
}
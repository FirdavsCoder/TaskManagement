export class UserEntity {
	constructor(dto) {
		this.login = dto.login
		this.password = dto.password
		this.full_name = dto.full_name
		this.company_id = dto.company_id
		this.role = dto.role
	}
}


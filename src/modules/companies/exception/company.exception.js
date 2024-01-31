export class CompanyException extends Error {
	constructor(message) {
		super(message);
		this.statusCode = 400;
	}
}

export class CompanyNotFound extends Error {
	constructor() {
		super("Company Not Found");
		this.statusCode = 404;
	}
}



export class UserTaskException extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode || 400
	}
}


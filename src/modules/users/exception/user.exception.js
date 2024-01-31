export class UserException extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode || 400
	}
}
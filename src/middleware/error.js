export const errorHandler = (err, req, res, next) => {
	let error = {...err}

	error.message = err.message

	// message for dev
	console.log(error.message.red)

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error"
	})
}


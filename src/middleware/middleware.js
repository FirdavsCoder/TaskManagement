import {verifyToken} from "../lib/jwt.js";
import {asyncHandler} from "./async.js";






// Protecting routes
export const checkUser = asyncHandler(async (req, res, next) => {
	let token;

	// Authorization: <type> <credentials> Bearer token
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1]
	}

	if(!token) {
		throw next(new Error("Not authorized to access this route"))
	}
	const decoded = verifyToken(token, process.env.JWT_SECRET)
	req.user = decoded
	req.role = decoded.data.role
	next()
})


export const checkRole = asyncHandler( async (req, res, next) => {
	const role = req.role
	console.log(role)
	if (role === "admin") {
		console.log(req.user.data.company_id)
		req.params.id = req.user.data.company_id
	}
	next()
})







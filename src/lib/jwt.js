import jwt from "jsonwebtoken";
import {config} from "../common/config/index.js"

export const generateToken = (data) => {
	return jwt.sign({data}, config.jwtKey, {expiresIn: config.jwtExpiredIn})
}

export const verifyToken = (token) => {
	return jwt.verify(token, config.jwtKey);
};


